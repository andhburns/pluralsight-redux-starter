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
      images = this.props.imageStore.searchresults.map(function(img) {
          return (
            <SoloImageWithButton removePic={this.props.removePic} key={img.name} img={img}
              removeImage={this.props.removeImage} addNewImage={this.props.addNewImage}
              noButton={false} noDeleteButton/>
          );
        },this);
        return images;
    }
    else{
      return (
        images = this.props.imageStore.searchresults.map(function(img) {
          return (
            <SoloImageWithButton removePic={this.props.removePic} key={img.name} img={img}
              removeImage={this.props.removeImage} addNewImage={this.props.addNewImage}
              noButton noDeleteButton/>
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
  gifs: React.PropTypes.array,
  addNewImage: React.PropTypes.func,
  noButton: React.PropTypes.bool,
  noDeleteButton: React.PropTypes.bool,
  removeImage: React.PropTypes.func,
  removePic: React.PropTypes.func,
  userStore: React.PropTypes.object,
  imageStore: React.PropTypes.object
};


export default inject("userStore", "imageStore")(observer(ShowGifs));
