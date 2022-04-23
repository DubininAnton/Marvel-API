import {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';
import Hummer from '../../resourses/img/HummerHeaderChar.png';
import ErrorText from '../errorText/ErrorText';
import './headerChar.scss';

const HeaderChar = () => {

    const [char, setChar] = useState({});

    const {getCharacter, getAllCharactersPerson, loading, error}= useMarvelService();

    const arrayId = async () => {
        let id=[];
        await getAllCharactersPerson ()
                  .then(res => res.data.results
                  .forEach(item => id.push(item.id)));
        randomId(id);
    }

    const randomId = (id) => {
        let randomId = id[Math.floor(Math.random()*id.length)]; 
        updateChar(randomId);
    }

    const updateChar = async (randomId) => {
        await getCharacter(randomId)
                .then(res => (
                    setChar (res)
            ))      
    }

        useEffect(()=> {
            arrayId()
        },[])


    const clickButton = () => {
        arrayId();
    }

        const spinner = loading ? <Spinner/> : null;
        const errorText = error ? <ErrorText/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
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
                                <button  className="button button__main">
                                    <div className="inner">
                                        <a href ={homepage} target="_blank" rel="noreferrer">HOMEPAGE</a>
                                    </div>
                                </button>
                            </div>
                            <div className="headerCharButton__wiki">
                                <button className="button button__secondary">
                                    <div className="inner">
                                        <a href ={wiki} target="_blank" rel="noreferrer">WIKI</a>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

export default HeaderChar;