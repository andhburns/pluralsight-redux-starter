import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';
import Navigation from './Navigation';
import { observer, inject } from 'mobx-react';
import Welcome from './Welcome';


class App extends React.Component {


  constructor(props) {
    super(props);

    this.props.imageStore.fetchLibrary();

  }

// 1. Move the fetch library function into ImageStore
  // everything that calls fetch library needs to be this.props.imageStore
// 2.  call fetch library in conponentDidMount
// 3. Add a delete image in the imageStore instead of removePic
//4. clean up duplicate code and use imageStore instead.
// 5. make a userStore and use it.

  conponentDidMount() {
    this.props.imageStore.fetchLibrary();
  }







  render() {
    return (
      <div className="container-fluid">
      <Navigation />
         {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  imageStore: React.PropTypes.object
};

export default inject("imageStore") (observer(App));
