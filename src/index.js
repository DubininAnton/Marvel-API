import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.scss'
// import MarvelService from './services/MarvelService';
import App from './components/app/App';

// let marvel = new MarvelService();
// marvel.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvel.getCharacter(1011334).then(res => console.log(res));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


