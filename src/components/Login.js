
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  loginHandler(e){
    e.preventDefault();
    this.props.userStore.authenticateUser(this.state);
  }






  render() {
    if(this.props.userStore.loggedIn) {
      return (
        <h1>You are logged on!</h1>
      );
    }
    return (
      <div>
        <form>
          User Name:<br/>
          <input onChange={this.handleUsernameChange} value={this.state.username} type="text" name="username"/><br/>
          Password:<br/>
          <input onChange={this.handlePasswordChange} value={this.state.password} type="password" name="password"/><br/>
          <button onClick={this.loginHandler} type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
    }
  }

  Login.propTypes = {
    userStore: React.PropTypes.object
  };

  export default inject("userStore")(observer(Login));
