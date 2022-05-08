import { Component } from "react";

import s from "./ImagesGallery.module.scss";

export default class ImagesGallery extends Component {
  state = {
    bigImage: this.props.gallery[0],
  };

  onImageClick = (e) => {
    this.setState({ bigImage: e.target.src });
  };

  render() {
    const { gallery, name } = this.props;

    return (
      <div className={s.gallery}>
        <ul className={s.list}>
          {gallery.map((picture) => (
            <li className={s.item} key={picture} onClick={this.onImageClick}>
              <img src={picture} alt={name} width="79" />
            </li>
          ))}
        </ul>
        <img src={this.state.bigImage} alt={name} width="610" />
      </div>
    );
  }
}
