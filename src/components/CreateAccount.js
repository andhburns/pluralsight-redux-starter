import React from 'react';



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      registered: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  addUserToDatabase(e){
    e.preventDefault();
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password
      })
    });
    this.setState({registered: true});
  }


  render() {
    if(this.state.registered) {
      return (
        <h1>Welcome!</h1>
      );
    }
    return (
      <div>
        <form>
          User Name:<br/>
          <input onChange={this.handleUsernameChange} value={this.state.username} type="text" name="username"/><br/>
          Password:<br/>
          <input onChange={this.handlePasswordChange} value={this.state.password} type="text" name="password"/><br/>
          <button onClick={this.addUserToDatabase} type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
    }
  }
