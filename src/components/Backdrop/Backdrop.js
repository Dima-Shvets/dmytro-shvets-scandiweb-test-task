import { Component } from "react";

import s from "./Backdrop.module.scss";

export default class Backdrop extends Component {
  overlayClickHandler = (e) => {
    if (e.target === e.currentTarget) {
      this.props.toggleCart();
    }
  };

  onEscButtonPress = (e) => {
    if (e.key === "Escape") {
      this.props.toggleCart();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.onEscButtonPress);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscButtonPress);
    document.body.style.overflow = "unset";
  }

  setBackdropStyles = () => {
    const header = document.querySelector("header");
    if (header) {
      return header.getBoundingClientRect().height;
    }
  };

  render() {
    const { overlayClickHandler } = this;
    const headerHeight = this.setBackdropStyles();
    return (
      <div
        className={s.backdrop}
        style={{ top: headerHeight }}
        onClick={overlayClickHandler}
      ></div>
    );
  }
}
