import { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderLink from '../headerLink/headerLink';
import '../../style/button.scss';
import '../charApp/charApp.scss';
import ErrorText from '../errorText/ErrorText';
import Page404 from '../Page404/Page404';
// import { CharMainPage } from '../pages/index';
import Spinner from '../spinner/spinner';

const ComicsListPage = lazy(() => import('../pages/ComicsListPage'));
const ComicsSinglePage = lazy(() => import('../pages/ComicsSinglePage'));
const CharMainPage = lazy(() => import('../pages/CharMainPage'));


class App extends Component {
 
  render () {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <HeaderLink/>
             <Suspense fallback = {<Spinner/>}>
              <Switch>
                <Route exact path="/">
                    <CharMainPage/>
                </Route>
                <Route exact path='/comics'>
                    <ComicsListPage/>
                </Route> 
                <Route exact path="/comics/:comicId">
                  <ComicsSinglePage/>
                </Route>
                <Route path="*">
                  <Page404/>
                </Route>
              </Switch>
             </Suspense>   
          </div>
        </div>
      </Router>

  );
  }
}

export default App;
