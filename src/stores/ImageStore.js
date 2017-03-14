import { extendObservable } from 'mobx';

export default class ImageStore {
  constructor() {
    extendObservable(this, {
      images: [],
      searchresults: ["this is a test"]
    });
    this.addNewImage = this.addNewImage.bind(this);
    this.setImages = this.setImages.bind(this);
    this.fetchLibrary = this.fetchLibrary.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
    this.removePic = this.removePic.bind(this);
    this.removeFromDatabase = this.removeFromDatabase.bind(this);
    this.returnSearch = this.returnSearch.bind(this);
  }

  convertToShowGifs(keyword, foundImages){
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug
    }));
  }

  newGiphySearch(keyword, limit, offset){
    fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC&limit=${limit}&offset=${offset}`)
      .then(result => result.json())
      .then(data => this.searchresults = this.convertToShowGifs(keyword, data.data));
  }


  returnSearch()
  {
    console.log(this.searchresults[0]);
  }
  fetchLibrary(){
    let originalfetch = fetch(`/gif`)
    .then(result => result.json())
    .then(images => {
      // console.log('got images', images);
      this.setImages(
        this.convertToShowGifs(images));
      });
  }

  removePic(img){
    let tempArray = this.images;
    let newArray = tempArray.filter(x => {
      if(x.name !== img.name){
        return x;
      }
    });
    this.removeFromDatabase(img);
    this.images= newArray;
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

  convertToShowGifs(foundImages){
    return foundImages.map(image => ({
      _id: image._id,
      name: image.url,
      keyword: image.keyword,
      url: image.url,
      description: image.description
    }));
  }

  setImages(images) {
    this.images = images;
  }

  addNewImage(img) {
    let allImages = this.images.push(img);
    this.images = allImages;
    this.addToDatabase(img);
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
      console.log("image added to DB", image);
    });
  }

}
