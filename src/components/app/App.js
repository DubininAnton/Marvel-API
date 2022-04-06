import { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import HeaderLink from '../headerLink/headerLink';
import HeaderChar from '../headerChar/headerChar';
import '../../style/button.scss';
import '../charApp/charApp.scss';
import CharApp from '../charApp/charApp';
import CharAppDescr from '../charAppDescr/charAppDescr';
import ErrorBoundaty from '../errorBoundary/errorBoundary';

import AppBanner from '../appBanner/appBanner';
import Comicslist from '../comicsList/comicsList';
// import ComicsDescr from '../comicsDescr/comicsDescr';


class App extends Component {
  state ={
    id: null
  }   

  onSetId = (id) => {
    this.setState(({id:id}))
  }

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <HeaderLink/>
            <Switch>
                <Route exact path="/">
                  <HeaderChar/>
                  <div className="main">
                    <div className="charApp">
                        <div>
                            <CharApp onSetId={this.onSetId} onId={this.state.id}/>
                        </div>
                    </div>
                    <ErrorBoundaty>
                      <CharAppDescr onCharId ={this.state.id} />
                    </ErrorBoundaty>
                  </div>
                </Route>
                <Route exact path='/comics'>
                    <AppBanner/>
                    <Comicslist/>
                    {/* <ComicsDescr/> */}
                </Route>
              </Switch>   
          </div>
        </div>
      </BrowserRouter>

  );
  }
}

export default App;
