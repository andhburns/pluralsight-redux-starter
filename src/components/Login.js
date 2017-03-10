
import React from 'react';



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false
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
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password
      })
    }).then(result => result.json())
    .then(function(json) {
      document.cookie = "token=" + json.token;
      console.log(json.token)
    });
    this.setState({loggedIn: true});
  }

  render() {
    if(this.state.loggedIn) {
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
          <input onChange={this.handlePasswordChange} value={this.state.password} type="text" name="password"/><br/>
          <button onClick={this.loginHandler} type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
    }
  }
