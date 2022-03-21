import React, { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charApp.scss';



class CharApp extends Component {

    state = {
        charList:[],
        newItemLoading: false,
        offset: 0,
        charEnded: false, 
        id: null
    }

    marvelService = new MarvelService();

    charListItem = async () => {
        await this.marvelService
            .getAllCharacters()
            .then(res => this.onCharrListLouded(res.data.results))
        }

    onCharrListLouded = (results) => {
        let ended = false;
        if(results.length < 9) {
            ended = true;
        }
        this.setState(({offset, charList}) => {
            return (
               {charList: [...charList, ...results],
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended,
                }
            )
        })
    }

    changeStateId = (id) => {
        this.setState({id:id})
    }

    renderItem =(arr) => {
        const idState = this.state.id;
        console.log(idState)
        const card = arr.map((item)=>{
            return (
                <div tabIndex={0} 
                    className={idState === item.id ? "charApp__item charApp__item_check" : 'charApp__item'} key={item.id} 
                    onClick={() => {this.props.onSetId(item.id); this.changeStateId(item.id)}}>
                    <img src={item.thumbnail.path + '.' + item.thumbnail.extension} alt={item.name} />
                    <h3 className="charApp__item_title">
                        {item.name}
                    </h3>
                </div>
            )
        
        })
        return card;
    }

    componentDidMount() {
        this.charListItem();
    }

    // Дозагрузка новых персонажей
    onRequest = (offset) => {
        this.onListCharLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(res => this.onCharrListLouded(res.data.results))
    }
    
    //Установка state newItemCharLoading в true для блокировки кнопки дозагрузки
    onListCharLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    render () {
        const charList = this.state.charList;
        const {newItemLoading, offset, charEnded} = this.state;
        const item = this.renderItem(charList);
        return (
            <div>
                <div className="charApp__list">
                    {item}
                </div>
                <button className="button button__long button__main"
                    disabled ={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick ={() => this.onRequest(offset)}>
                    <div className="inner">LOAD MORE</div>
                </button>
            </div>
        )
    }
   
}

export default CharApp;

