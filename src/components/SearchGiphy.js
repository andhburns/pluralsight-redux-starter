import React from 'react';
import math from 'mathjs';
import ShowGifs from "./ShowGifs";
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';


let testGifs = [];

class SearchGiphy extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      limit: 5,
      random: false,
      offset: '0',
      foundImages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleRandomChange = this.handleRandomChange.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
    // this.addNewImage = this.addNewImage.bind(this);
  }

  handleSubmit(e) {
    if(this.state.random){
      const newrandom = math.randomInt(100);
      this.setState({offset: newrandom});
    }else{
        this.setState({offset: '0'});
    }
    e.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&api_key=dc6zaTOxFJmzC&limit=${this.state.limit}&offset=${this.state.offset}`)
      .then(result => result.json())
      .then(data => {
        this.props.imageStore.searchresults = this.convertToShowGifs(this.state.keyword, data.data);});

        this.props.imageStore.returnSearch(this.state.keyword, data.data);
  }



  removeImage(img){
    let tempArray = this.state.foundImages;
    for(let i=0; i<tempArray.length ; i++){
      if(tempArray[i].name == img.name){
        tempArray.splice(i,1);
      }
    }
    console.log(tempArray);
    this.setState({foundImages: tempArray});
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  handleRandomChange(e) {
    const newrandom = !this.state.random;
    this.setState({random: newrandom});
  }

  // addNewImage(img) {
  //   testGifs.push(img);
  //   this.addToDatabase(img);
  //   this.setState({images: testGifs});
  // }

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

  render() {
    return (
      <div>
        <form method="" role="form">
            <legend>Search Giphy</legend>
            <div className="form-group">
              <input onChange={this.handleKeywordChange} value={this.state.keyword} type="text" className="form-control" id="keyword" placeholder="keyword"/>
              <input onChange={this.handleLimitChange} value={this.state.limit} type="number" className="form-control" id="limit" placeholder="limit"/>
              <input onChange={this.handleRandomChange} value={this.state.random} type="checkbox"j id="random"/> Randomize
            </div>
            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            <Link to ="/SearchResults">TEst</Link>
         </form>
         <div>{this.props.children}</div>
       </div>
    );
  }
}

SearchGiphy.propTypes = {
  addNewImage: React.PropTypes.func,
  removePic: React.PropTypes.func,
  addToDatabase: React.PropTypes.func,
  imageStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject("imageStore")(observer(SearchGiphy));
