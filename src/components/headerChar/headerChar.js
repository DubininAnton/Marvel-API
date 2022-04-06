import {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';
import Hummer from '../../resourses/img/HummerHeaderChar.png';
import ErrorText from '../errorText/ErrorText';
import './headerChar.scss';

const HeaderChar = () => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const {getCharacter, getAllCharactersPerson}= useMarvelService();

    const arrayId = async () => {
        let id=[];
        await getAllCharactersPerson
                  .then(res => res.data.results
                  .forEach(item => id.push(item.id)));
        randomId(id);
    }

    const randomId = (id) => {
        let randomId = id[Math.floor(Math.random()*id.length)]; 
        updateChar(randomId);
    }
   
    const onError = () => {
        setLoading({loading: false})
        setError({error:true})
    }
    
    const onCharLoading =() => {
        setLoading(true)
    }

    const updateChar = (randomId) => {
        getCharacter(randomId)
            .then(res => (
                setChar (res)
            ))
            .catch (onError);
        
        setLoading (false)
        
               
    }

        useEffect(()=> {
            arrayId()
        },[])


    const clickButton = () => {
        arrayId();
        onCharLoading()
    }

        const spinner = loading ? <Spinner/> : null;
        const errorText = error ? <ErrorText/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        return (
            <div className="headerChar">
                {spinner}
                {errorText}
                {content}
                <div className="headerChar__tryit">
                    <div className="headerChar__tryit_descr">
                        Random character for today! <br />
                        Do you want to get to know him better? <br />
                        <div className="headerChar__tryit_description">
                            Or choose another one
                        </div>
                    </div>
                    <button onClick = {clickButton} href ="#" className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </button>
                    <img src={Hummer} alt="HummerPictures" />
                </div>
            </div>
        )

}

    const View =({char}) => {
        const {name, description, thumbnail, homepage, wiki} = char;
        return (
            <div className="headerChar__wiki">
                <div className="headerChar__wiki_inner">
                    <img src={thumbnail} alt="Pictures" />
                    <div className="headerChar__wiki_descr">
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <div className="headerCharButton">
                            <div className="headerCharButton__homepage">
                                <button href ={homepage} className="button button__main">
                                    <div className="inner">HOMEPAGE</div>
                                </button>
                            </div>
                            <div className="headerCharButton__wiki">
                                <button href ={wiki} className="button button__secondary">
                                    <div className="inner">WIKI</div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

export default HeaderChar;