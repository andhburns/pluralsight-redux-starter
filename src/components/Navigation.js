import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">~ GIPHY SEARCH ~</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><Link to="/SearchGiphy">Search-Giphy</Link></li>
            <li><Link to="/SearchGifs">Search-Gifs</Link></li>
            <li><Link to="/ShowGifs">Show-Gifs</Link></li>
          </ul>
        </div>
      </nav>
  );
  }
}
