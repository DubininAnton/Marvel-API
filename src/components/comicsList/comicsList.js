import {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import Spinner from '../spinner/spinner';
import useMarvelService from "../../services/MarvelService";
import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] =useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(null);
    const {getComicsList} = useMarvelService();

    const comicsItem = async () => {
        setLoading(true)
        await getComicsList(offset)
                .then(res => onComicsList(res))
    }

    const onComicsList = (res)=> {
        setLoading(false)
        setOffset(offset+8)
        setComicsList([...comicsList, ...res])

    }

    useEffect(()=> {
        comicsItem()
        setLoading(true)
    }, [])

    const renderCardComics = (arr) => {
        const card = arr.map((card) => {
            return (
                
                <div className="comicsList__item" key={card.id}>
                    <Link to={`/comics/${card.id}`}>
                        <img src={card.thumbnail.path + "." + card.thumbnail.extension} alt={card.name} />
                        <p>{card.title}</p>
                        <span>{card.prices[0].price + "$"}</span>
                    </Link>
                </div> 
            )
        })
        return card;

    }

    // Добавление новых киксов с кнопки LOAD MORE
    const onLoadNewComics = () => {
        comicsItem()
    }

    const card = renderCardComics(comicsList)
    const spinner = loading ? <Spinner/> : null;
    return (
        <div className="container">
            <div className="comicsList">
                {card}
            </div>
            {spinner}
            <div onClick={onLoadNewComics} className="button button__long button__main">
                <div className="inner">LOAD MORE</div>
            </div>
        </div>
    )
}



export default ComicsList;