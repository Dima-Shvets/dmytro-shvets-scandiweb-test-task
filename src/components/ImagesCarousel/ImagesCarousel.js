import { Component } from "react";

import { ReactComponent as LeftArrow } from "./left.svg";
import { ReactComponent as RightArrow } from "./right.svg";

import s from './ImagesCarousel.module.scss'

export default class ImagesCarousel extends Component {
    state = {
        imageUrl: this.props.gallery[0],
    }

    showPrevPicture = () => {
        const { gallery } = this.props;
      this.setState(({imageUrl}) => {
            
          const currentPictureIndex = gallery.indexOf(imageUrl);
          if (currentPictureIndex > 0 && currentPictureIndex !== -1) {
                const nextPictureIndex = currentPictureIndex - 1; 
                return {imageUrl: gallery[nextPictureIndex]}
          }
            return { imageUrl: gallery[gallery.length - 1] };
        })
  }

  showNextPicture = () => {
    const { gallery } = this.props;
      this.setState((prevState) => {
            
          const currentPictureIndex = gallery.indexOf(prevState.imageUrl);
          
          if (currentPictureIndex < gallery.length - 1 && currentPictureIndex !== -1) {
                const nextPictureIndex = currentPictureIndex + 1; 
                return {imageUrl: gallery[nextPictureIndex]}
          }
            return { imageUrl: gallery[0] };
        })
  }

    render() {
        const { type, name, gallery } = this.props;
        const { imageUrl } = this.state;
        const { showPrevPicture, showNextPicture } = this;
        return (
            <div className={s.imageWrapper}>
            <img src={imageUrl} alt={name} className={s[`${type}Image`]} />
               {type === 'view' && gallery.length > 1 &&
                <div className={s.carouselBtns}>
                  <button onClick={showPrevPicture}><LeftArrow/></button>
                  <button onClick={showNextPicture}><RightArrow/></button>
                </div>}
            </div>
        )
    }
}