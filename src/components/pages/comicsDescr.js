
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorText from '../errorText/ErrorText';
import './comicsDescr.scss';


const ComicsDescr =() => {

    const  {comicId}  = useParams();
    const [comic, setComic] = useState([])
    const {getComicsItem, loading, error} = useMarvelService();

    const updateComic =  () => {
        getComicsItem(comicId)
            .then(onSetComic)
    }
 

    const onSetComic = (comic) => {
        setComic(comic)
    }

    useEffect(()=> {
            updateComic()
    }, [comicId])


    const content = !loading ? <View comic={comic}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMassege = error ? <ErrorText/> : null;

    return (
        <>
            {content}
            {spinner}
            {errorMassege}
        </>
    )

}

const View = ({comic}) => {

    const {title, description, price, page, language, thumbnail} = comic;

        return (
          
            <div className="comicsDescr">
                <img src={thumbnail} alt={title} />
                <div className="comicsDescr__block">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>{page}</span>
                    <h4>Language: {language}</h4>
                    <h2>{price}</h2>
                </div>
                <Link to='/comics' className="comicsDescr__link">Back to all</Link>
            </div>
        
           
        )
    
}

export default ComicsDescr;