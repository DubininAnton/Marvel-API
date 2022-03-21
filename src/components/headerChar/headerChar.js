import {Component} from 'react';
import Spinner from '../spinner/spinner';
import Hummer from '../../resourses/img/HummerHeaderChar.png';
import ErrorText from '../errorText/ErrorText';
import MarvelService from '../../services/MarvelService';
import './headerChar.scss';

class HeaderChar extends Component {

    state = {
        char: null,
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    arrayId = async () => {
        let id=[];
        await this.marvelService
                  .getAllCharactersPerson()
                  .then(res => res.data.results
                  .forEach(item => id.push(item.id)));
        this.randomId(id);
    }

    randomId = (id) => {
        let randomId = id[Math.floor(Math.random()*id.length)]; 
        this.updateChar(randomId);
    }
   
    onError = () => {
        this.setState = ({
            loading: false,
            error: true
        })
    }
    
    onCharLoading =() => {
        this.setState(({loading: true}))
    }

    updateChar = (randomId) => {
        this.marvelService
        .getCharacter(randomId)
        .then(res => this.setState( {
            char: res,
            loading: false
        }))
        .catch (this.onError);
               
    }


    componentDidMount() {
        this.arrayId();
    }

    clickButton = () => {
        this.arrayId();
        this.onCharLoading()
    }

    render () {
        const {char, loading, error} = this.state;
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
                    <button onClick = {this.clickButton} href ="#" className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </button>
                    <img src={Hummer} alt="HummerPictures" />
                </div>
            </div>
        )

    }
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