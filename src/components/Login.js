
import React from 'react';



export default class Login extends React.Component {
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
    }).then(result => result.json());

    // .then(function(json) {
    //   console.log(document.cookie);
    //   document.cookie = "token=" + json.token;
    // });
  }
  console.log(result);


  render() {

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
