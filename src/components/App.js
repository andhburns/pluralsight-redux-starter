import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';

let testGifs = [];

class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      images: []
    };

    this.fetchLibrary();

    this.addNewImage = this.addNewImage.bind(this);
    this.removePic = this.removePic.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
    this.removeFromDatabase = this.removeFromDatabase.bind(this);
  }

  fetchLibrary(){
    let originalfetch = fetch(`/gif`)
    .then(result => result.json())
    .then(data => this.setState({
      images: this.convertToShowGifs(this.state.keyword, data)}));
  }

  convertToShowGifs(keyword, foundImages){
    return foundImages.map(image => ({
      _id: image._id,
      name: image.url,
      keyword: image.keyword,
      url: image.url,
      description: image.description
    }));
  }

  addNewImage(img) {
    testGifs.push(img);
    this.addToDatabase(img);
    this.setState({images: testGifs});
  }

  addToDatabase(img){
    fetch('/gif', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: img._id,
        keyword: img.name,
        url: img.url,
        description: img.description
      })
    }).then(result => result.json())
    .then(image => {
      let allimages = this.state.images.slice();
      allimages.push(image);
      this.setState({
        images: allimages
      });
    });
    // then(this.fetchLibrary());
  }

  removePic(img){
    let tempArray = this.state.images;
    let newArray = tempArray.filter(x => {
      if(x.name !== img.name){
        return x;
      }
    });
    this.removeFromDatabase(img);
    this.setState({images: newArray});
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
        <div>
          <Link to="/ShowGifs">ShowGifs</Link>
          <Link to="/SearchGiphy">SearchGiphy</Link>
          <Link to="/SearchGifs">SearchGifs</Link>
        </div>
         {this.props.children}
        <div className="col-md-12">
          <ShowGifs removePic={this.removePic} removeImage={this.addNewImage} gifs={this.state.images} addNewImage={this.addNewImage} noButton/>
        </div>
      </div>
    );
  }
}

export default App;
// 
// <div className="row">
//   <div className="col-md-6">
//     <SearchGiphy removePic={this.removePic} addNewImage={this.addNewImage}/>
//   </div>
//   <div className="col-md-6">
//     <SearchGifs addNewImage={this.addNewImage}/>
//   </div>
// </div>
