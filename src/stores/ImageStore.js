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
    this.convertToShowGifs = this.convertToShowGifs.bind(this);
    this.convertSearchGifs = this.convertSearchGifs.bind(this);
  }



  newGiphySearch(keyword, limit, offset){
    fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC&limit=${limit}&offset=${offset}`)
      .then(result => result.json())
      .then(data => this.searchresults = this.convertSearchGifs(data.data));
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
    console.log(img._id);
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
      description: image.slug
    }));
  }

  convertSearchGifs(foundImages){
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: image.slug
    }));
  }

  setImages(images) {
    this.images = images;
  }

  addNewImage(img) {
    this.addToDatabase(img);
  }

  removeImage(img) {
    let newArray = this.searchresults;
    newArray= newArray.filter(function(x){
      return x.url !== img.url;
    });
    this.searchresults = newArray;
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
    }).then(result => result.json()).then(res => {img._id = res._id;})
    .then(this.images.push(img))
    .then(image => {
      console.log("image added to DB", image);
    });
  }

}
