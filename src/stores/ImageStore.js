import { extendObservable } from 'mobx';

export default class ImageStore {
  constructor() {
    extendObservable(this, {
      images: [],
      searchresults: []
    });
    this.addNewImage = this.addNewImage.bind(this);
    this.setImages = this.setImages.bind(this);
    this.fetchLibrary = this.fetchLibrary.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
  }

  fetchLibrary(){
    let originalfetch = fetch(`/gif`)
    .then(result => result.json())
    .then(images => {
      console.log('got images', images);
      this.setImages(
        this.convertToShowGifs(images));
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
