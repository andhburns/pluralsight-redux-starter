import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';
import Navigation from './Navigation';
import { observer, inject } from 'mobx-react';


class App extends React.Component {


  constructor(props) {
    super(props);

    this.fetchLibrary();

    this.removePic = this.removePic.bind(this);
    this.removeFromDatabase = this.removeFromDatabase.bind(this);
  }

// 1. Move the fetch library function into ImageStore
  // everything that calls fetch library needs to be this.props.imageStore
// 2.  call fetch library in conponentDidMount
// 3. Add a delete image in the imageStore instead of removePic
//4. clean up duplicate code and use imageStore instead.
// 5. make a userStore and use it.

  fetchLibrary(){
    let originalfetch = fetch(`/gif`)
    .then(result => result.json())
    .then(data => {
      console.log('got images', data);
      this.props.imageStore.setImages(
        this.convertToShowGifs(data));
      });
  }

  convertToShowGifs(foundImages){
    return foundImages.map(image => ({
      _id: image._id,
      name: image.url,
      keyword: image.keyword,
      url: image.url,
      description: image.description
    }));
  }

  removePic(img){
    // let tempArray = this.state.images;
    // let newArray = tempArray.filter(x => {
    //   if(x.name !== img.name){
    //     return x;
    //   }
    // });
    // this.removeFromDatabase(img);
    // this.setState({images: newArray});
  }

  removeFromDatabase(img){
    fetch('/gif/'+img._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
      <Navigation />
         {this.props.children}
        <div className="col-md-12">
          <ShowGifs removePic={this.removePic} removeImage={this.props.imageStore.addNewImage}
            gifs={this.props.imageStore.images} addNewImage={this.props.imageStore.addNewImage} noButton/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  imageStore: React.PropTypes.object
};

export default inject("imageStore") (observer(App));
