import { Component } from 'react';
import mainbg from '../../resourses/img/mainbg.png';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorText from '../errorText/ErrorText';
import './charAppDescr.scss';

class CharAppDescr extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }
    marvelService = new MarvelService();

    componentDidUpdate(prevProps) {
        const onCharId = this.props;
        if(onCharId.onCharId !== prevProps.onCharId) {
            this.onUpdateChar()
            
        }
        
    }

    onUpdateChar =() => {
        const onCharId = this.props;

        this.onLoadingCharInfo();

        this.marvelService
        .getCharacter(onCharId.onCharId)
        .then(res => this.onLoadCharInfo(res))
        .catch(this.onError)
    }

    onError = () => {
        this.setState = ({
            loading: false,
            error: true
        })
    }

    onLoadingCharInfo =() => {
        this.setState({loading: true})
    }


    onLoadCharInfo = (res) => {

        this.setState(() => ({
            char: res,
            loading: false,                 
        }))
    }

   
    
    onSetState = () => {
        const onCharId = this.props;
        this.setState(({id:onCharId.onCharId}))
    }

    
    onSpinner = () => {
        this.setState({spinnr: true})
    }

   render () {

       const {char, loading, error} = this.state;

       const skeleton = char || loading ? null : <Skeleton/>;
       const content = !(loading || !char) ? <View char={char}/> : null;
       const spinner = loading ? <Spinner/> : null;
       const errorText = error ? <ErrorText/> : null;
    return (
        <div className="charApp__descr">
            {skeleton}
            {content}
            {spinner}
            {errorText}
            <img src={mainbg} alt="mainbg" className="mainbg"/>
        </div>
        )
   }
}


const View = ({char}) => {
    const {name, thumbnail, description, stories, wiki, homepage} = char;
    
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
                           stories.map((res) => {
                                return (
                                    <div className="charApp__descr_link">
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