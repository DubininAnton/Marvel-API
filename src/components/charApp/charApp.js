import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import './charApp.scss';



const CharApp =(props)=> {

    const [charList, setCharList]  = useState([]);
    const [newItemLoading, setnewItemLoading]  = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [id, setId] = useState(null)


   const {getAllCharacters} = useMarvelService();

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

        // this.setState(({offset, charList}) => {
        //     return (
        //        {charList: [...charList, ...results],
        //         newItemLoading: false,
        //         offset: offset + 9,
        //         charEnded: ended,
        //         }
        //     )
        // })
    }

   const changeStateId = (id) => {
        setId(id)
    }

    const renderItem =(arr) => {
        const idState = id;
        console.log(idState)
        const card = arr.map((item)=>{
            return (
                <div tabIndex={0} 
                    className={idState === item.id ? "charApp__item charApp__item_check" : 'charApp__item'} key={item.id} 
                    onClick={() => {props.onSetId(item.id); changeStateId(item.id)}}>
                    <img src={item.thumbnail.path + '.' + item.thumbnail.extension} alt={item.name} />
                    <h3 className="charApp__item_title">
                        {item.name}
                    </h3>
                </div>
            )
        
        })
        return card;
    }

    useEffect(()=> {
        charListItem()
    },[])
    // componentDidMount() {
    //     this.charListItem();
    // }

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

   
        // const charList = this.state.charList;
        // const {newItemLoading, offset, charEnded} = this.state;
        const item = renderItem(charList);

        return (
            <div>
                <div className="charApp__list">
                    {item}
                </div>
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

