import { useState, useEffect} from 'react';
import mainbg from '../../resourses/img/mainbg.png';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorText from '../errorText/ErrorText';
import './charAppDescr.scss';

const CharAppDescr = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, loading, error} = useMarvelService();


    useEffect(()=> {
        if(props.onCharId !== undefined) {
            onUpdateChar()
        }
    }, [props.onCharId])
        

    const onUpdateChar =() => {
        
        const onCharId = props.onCharId;

        getCharacter(onCharId)
            .then(onLoadCharInfo)
    }

    const onLoadCharInfo = (res) => {
        setChar(res)
    }

       const skeleton = char || loading ? null : <Skeleton/>;
       const content = !(loading || !char) ? <View char={char}/> : null;
       const spinnerView = loading ? <Spinner/> : null;
       const errorText = error ? <ErrorText/> : null;
    return (
        <div className="charApp__descr">
            {skeleton}
            {content}
            {spinnerView}
            {errorText}
            <img src={mainbg} alt="mainbg" className="mainbg"/>
        </div>
        )
   }



const View = ({char}) => {
    const {name, thumbnail, description, stories, wiki, homepage } = char;
    
        return (
            <>
            <div className="charAppCard">
                    <div className="charApp__descr_head">
                        <img src={thumbnail} alt="loki" className="lokiImg"/>
                        <div className="charApp__descr_head_link">
                            <h3 className="charApp__item_title">
                                {name}
                            </h3>
                            <div className="button button__main">
                                <div className="inner">LOAD MORE</div>
                               <a href={homepage}> </a>
                            </div>
                            <div href={wiki} className="button button__secondary">
                                <div className="inner">WIKI</div>
                                <a href={wiki}> </a>
                            </div>
                        </div>
                    </div>
                    <p>{description}</p>
                    <span>Comics:</span>
                    <div className='charApp__inner'>
                        {
                           stories.map((res, i) => {
                                return (
                                    <div className="charApp__descr_link" key={i}>
                                        {res.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
        
}

export default CharAppDescr;