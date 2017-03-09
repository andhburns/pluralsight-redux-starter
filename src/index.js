import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';
import ShowGifs from './components/ShowGifs';
import SearchGiphy from './components/SearchGiphy';
import SearchGifs from './components/SearchGifs';






render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/ShowGifs" component={ShowGifs}/>
      <Route path="/SearchGiphy" component={SearchGiphy}/>
      <Route path="/SearchGifs" component={SearchGifs}/>
    </Route>
  </Router>
), document.getElementById('app'));




// ReactDOM.render(<App/>, document.getElementById('app'));
