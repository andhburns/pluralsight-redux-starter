import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';
import { observer, inject } from 'mobx-react';

class ShowGifs extends React.Component {
  constructor() {
    super();
    this.whenLoggedIn = this.whenLoggedIn.bind(this);
  }
  whenLoggedIn() {
    let images;
    if(this.props.userStore.loggedIn) {
      return (
        images = this.props.userStore.searchresults.map(function(img) {
          return (
            <SoloImageWithButton removePic={this.props.removePic} key={img.name} img={img}
              removeImage={this.props.removeImage} addNewImage={this.props.addNewImage}
              noButton={false} noDeleteButton={true}/>
          );
        },this)
      );
    }
    else{
      return (
        images = this.props.userStore.searchresults.map(function(img) {
          return (
            <SoloImageWithButton removePic={this.props.removePic} key={img.name} img={img}
              removeImage={this.props.removeImage} addNewImage={this.props.addNewImage}
              noButton={true} noDeleteButton={true}/>
          );
        },this)
      );
    }
  }

  render() {
  let images = this.whenLoggedIn();
  return (
    <div>
      {images}
    </div>
  );
}
}




ShowGifs.propTypes = {
  gifs: React.PropTypes.array.isRequired,
  addNewImage: React.PropTypes.func.isRequired,
  noButton: React.PropTypes.bool,
  noDeleteButton: React.PropTypes.bool,
  removeImage: React.PropTypes.func.isRequired,
  removePic: React.PropTypes.func.isRequired,
  userStore: React.PropTypes.object,
  imageStore: React.PropTypes.object
};


export default inject("userStore", "imageStore")(observer(ShowGifs));
