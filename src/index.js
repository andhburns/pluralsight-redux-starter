import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from './components/App';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import ShowGifs from './components/ShowGifs';
import SearchGiphy from './components/SearchGiphy';
import SearchGifs from './components/SearchGifs';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { Provider } from 'mobx-react';
import ImageStore from './stores/ImageStore';
import UserStore from './stores/UserStore';
import ShowGifsWrapper from './components/ShowGifsWrapper';
import Welcome from './components/Welcome';
import Library from './components/Library';

const imageStore = new ImageStore();
const userStore = new UserStore();




render((
  <Provider imageStore={imageStore} userStore={userStore}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="/ShowGifs" component={Library}/>
        <Route path="/SearchGiphy" component={SearchGiphy}>
          <Route path="/SearchResults" component={ShowGifs}/>
        </Route>
        <Route path="/SearchGifs" component={SearchGifs}/>
        <Route path="/CreateAccount" component={CreateAccount}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Logout" component={Login}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));




// ReactDOM.render(<App/>, document.getElementById('app'));
