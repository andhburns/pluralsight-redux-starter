import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';

let testGifs = [];

class App extends React.Component {


  constructor(props) {
    super(props);


    let originalfetch = fetch(`http://localhost:3000/gif`)
    .then(result => result.json())
    .then(data => this.setState({
      images: this.convertToShowGifs(this.state.keyword, data)}));

    this.state = {
      // testGifs: [],
      images: []
    };
    this.addNewImage = this.addNewImage.bind(this);
    this.removePic = this.removePic.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
    this.removeFromDatabase = this.removeFromDatabase.bind(this);
    // this.convertToShowGifs = this.convertToShowGifs.bind(this);
  }

  convertToShowGifs(keyword, foundImages){
    return foundImages.map(image => ({
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
        keyword: img.name,
        url: img.url,
        description: img.description
      })
    });
  }

  removePic(img){
    let tempArray = this.state.images;
    for(let i=0; i<tempArray.length ; i++){
      if(tempArray[i].name == img.name){
        tempArray.splice(i,1);
      }
    }
    this.removeFromDatabase(img);
    this.setState({images: tempArray});
  }

  removeFromDatabase(img){
    fetch('/gif', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: img.name,
        url: img.url,
        description: img.description
      })
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <SearchGiphy removePic={this.removePic} addNewImage={this.addNewImage}/>
          </div>
          <div className="col-md-6">
            <SearchGifs addNewImage={this.addNewImage}/>
          </div>
        </div>
        <div className="col-md-12">
          <ShowGifs removePic={this.removePic} removeImage={this.addNewImage} gifs={this.state.images} addNewImage={this.addNewImage} noButton/>
        </div>
      </div>
    );
  }
}

export default App;
