import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderLink from '../headerLink/headerLink';
import '../../style/button.scss';
import '../charApp/charApp.scss';
import ErrorText from '../errorText/ErrorText';
import { ComicsListPage, ComicsSinglePage, CharMainPage } from '../pages/index';



class App extends Component {
 
  render () {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <HeaderLink/>
              <Switch>
                  <Route exact path="/">
                      {CharMainPage}
                  </Route>
                  <Route exact path='/comics'>
                      {ComicsListPage}
                  </Route> 
                  <Route exact path="/comics/:comicId">
                    {ComicsSinglePage}
                  </Route>
                  <Route path="*">
                    <ErrorText/>
                  </Route>
              </Switch>   
          </div>
        </div>
      </Router>

  );
  }
}

export default App;
