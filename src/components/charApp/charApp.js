import {useState, useEffect} from 'react';
import { Transition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorText from '../errorText/ErrorText';
import './charApp.scss';




const CharApp =(props)=> {
    const duration = 300;
   
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
      }
    const transitionStyles = {
        entering: { opacity : 0 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 1 },
        exited:  { opacity: 0 },
    }

    const [charList, setCharList]  = useState([]);
    const [newItemLoading, setnewItemLoading]  = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [id, setId] = useState(null)


   const {getAllCharacters, loading, error} = useMarvelService();

    const charListItem = () => {
            getAllCharacters()
             .then(res => onCharrListLouded(res.data.results))
        }

    const onCharrListLouded = (results) => {
        let ended = false;
        if(results.length < 9) {
            ended = true;
        }
        setCharList([...charList, ...results])
        setnewItemLoading(false)
        setOffset(offset + 9)
        setCharEnded(ended)
    }

   const changeStateId = (id) => {
        setId(id)
    }

    const renderItem =(arr, duration) => {
        const idState = id;
        const card = arr.map((item)=>{
            return (
                <div tabIndex={0} 
                    className={idState === item.id ? "charApp__item charApp__item_check" : 'charApp__item'} key={item.id} 
                    onClick={() =>{props.onSetId(item.id); changeStateId(item.id)}}>
                    <TransitionGroup appear>
                        <Transition timeout = {duration} >
                            {state => (
                                <div style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}>
                                    <img src={item.thumbnail.path + '.' + item.thumbnail.extension} alt={item.name} />
                                    <h3 className="charApp__item_title">
                                        {item.name}
                                    </h3>
                                </div>
                            )}
                        </Transition>
                    </TransitionGroup>
                </div>
            )
        
        })
        return card;
    }

    useEffect(()=> {
        charListItem()
    },[])

    // Дозагрузка новых персонажей
    const onRequest = (offset) => {
        onListCharLoading();
            getAllCharacters(offset)
                .then(res => onCharrListLouded(res.data.results))
    }
    
    //Установка state newItemCharLoading в true для блокировки кнопки дозагрузки
    const onListCharLoading = () => {
        setnewItemLoading({
            newItemLoading: true
        })
    }

    const item = renderItem(charList, duration);
    const spinner = loading ? <Spinner/> : null;
    const errorMassege = error ? <ErrorText/> : null;
    return (
        <div>
            <div className="charApp__list">
                {item}                
                {errorMassege}
            </div>
                {spinner}
            <button className="button button__long button__main"
                disabled ={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick ={() => onRequest(offset)}>
                <div className="inner">LOAD MORE</div>
            </button>
        </div>
    )
    
   
}

export default CharApp;

