import React from 'react';
import { observer, inject } from 'mobx-react';
import {Jumbotron, Well} from 'react-bootstrap';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.createWelcomeComponent = this.createWelcomeComponent.bind(this);
  }

createWelcomeComponent() {
  console.log(this.props.userStore.name)
  if(this.props.userStore.loggedIn) {
    return (
      <h1>You are logged on, start searching</h1>
    );
  } else{
  return (
    <div>
      <h1>Welcome to Giphy Search, login and start searching</h1>
    </div>
  );
 }
}

render() {
  let welcomeComponent = this.createWelcomeComponent();

    return(
      <Jumbotron className="col-md-12">
      {welcomeComponent}
      </Jumbotron>
    );
  }
}



  Welcome.propTypes = {
    userStore: React.PropTypes.object
  };

  export default inject("imageStore", "userStore")(observer(Welcome));
