import React from 'react';
import ShowGifs from "./ShowGifs";
import { inject, observer } from 'mobx-react';


class ShowGifsWrapper extends React.Component{
  render() {
    return(
      <div>
        <ShowGifs gifs={this.props.imageStore.images} />
      </div>
    );
  }
}


export default inject ("imageStore") (observer(ShowGifsWrapper));
