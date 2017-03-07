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
    this.convertToShowGifs = this.convertToShowGifs.bind(this);
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
    this.setState({images: testGifs});
  }

  removePic(img){
    let tempArray = this.state.images;
    for(let i=0; i<tempArray.length ; i++){
      if(tempArray[i].name == img.name){
        tempArray.splice(i,1);
      }
    }
    this.setState({images: tempArray});
  }

  render() {
    return (
      <div>
        <SearchGiphy removePic={this.removePic} addNewImage={this.addNewImage}/>
        <SearchGifs addNewImage={this.addNewImage}/>
        <ShowGifs removePic={this.removePic} removeImage={this.addNewImage} gifs={this.state.images} addNewImage={this.addNewImage} noButton/>
      </div>
    );
  }
}

export default App;
