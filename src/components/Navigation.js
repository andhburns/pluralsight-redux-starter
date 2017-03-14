import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { observer, inject } from 'mobx-react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.userName = this.userName.bind(this);
    this.logInLogOut = this.logInLogOut.bind(this);
  }
userName() {
  if(this.props.userStore.loggedIn) {
    return <li><Link to="">{this.props.userStore.username}</Link></li>;
  }
  else {
    return <div></div>;
  }
}

logInLogOut() {
  if(this.props.userStore.loggedIn) {
    return (<li onClick={this.props.userStore.logUserOut}><Link to="/Logout">Logout</Link></li>);
  } else {
    return <li><Link to="/Login">Login</Link></li>;
  }
}

  render() {
    let userComponent = this.userName();
    let logInLogOut = this.logInLogOut();
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
            <li><Link to="/CreateAccount">Create Account</Link></li>
            {logInLogOut}
            {userComponent}
          </ul>
        </div>
      </nav>
  );
  }
}
Navigation.propTypes={userStore: React.PropTypes.object};

export default inject("userStore")(observer(Navigation));
