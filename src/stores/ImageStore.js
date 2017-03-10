import { extendObservable } from 'mobx';

export default class ImageStore {
  constructor() {
    extendObservable(this, {
      images: []
    });
    this.addNewImage = this.addNewImage.bind(this);
    this.setImages = this.setImages.bind(this);
    // this.fetchLibary = this.fetchLibary.bind(this);
  }

  // fetchLibrary(){
  //   let originalfetch = fetch(`/gif`)
  //   .then(result => result.json())
  //   .then(data => {
  //     console.log('got images', data);
  //     this.props.imageStore.setImages(
  //       this.convertToShowGifs(data));
  //     });
  // }

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
