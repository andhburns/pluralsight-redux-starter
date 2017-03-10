import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';

ShowGifs.propTypes = {
  gifs: React.PropTypes.array.isRequired,
  addNewImage: React.PropTypes.func.isRequired,
  noButton: React.PropTypes.bool,
  noDeleteButton: React.PropTypes.bool,
  removeImage: React.PropTypes.func.isRequired,
  removePic: React.PropTypes.func.isRequired
};

export default function ShowGifs(props) {
  // console.log(props.gifs);
  let images = props.gifs.map(function(img) {
    return (
      <SoloImageWithButton removePic={props.removePic} key={img.name} img={img}
        removeImage={props.removeImage} addNewImage={props.addNewImage}
        noButton={props.noButton} noDeleteButton={props.noDeleteButton}/>
    );
  });
  return (
    <div>
      {images}
    </div>
  );
}
