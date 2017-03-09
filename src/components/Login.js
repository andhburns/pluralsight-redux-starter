import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }


  render() {
    return (
      <div>
        <form>
          User Name:<br/>
          <input onChange={this.handleUsernameChange} value={this.state.username} type="text" name="username"/><br/>
          Password:<br/>
          <input onChange={this.handlePasswordChange} value={this.state.password} type="text" name="password"/><br/>
        </form>
      </div>
    );
    }
  }
