import { Component } from "react";

import { ReactComponent as CartIcon } from "./CartIcon.svg";

import s from "./CartDropdown.module.scss";

export default class CartDropdown extends Component {
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
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscButtonPress);
  }

  render() {
    const { cartOpen, toggleCart, children } = this.props;
    const { overlayClickHandler } = this;

    return (
      <div className={s.dropdown}>
        <button className={s.toggle} type="button" onClick={toggleCart}>
          <CartIcon width="20" height="18" />
        </button>
        {cartOpen && (
          <div>
            <div className={s.backdrop} onClick={overlayClickHandler}>
            </div>
            <div className={s.wrapper}>
                {children}
            </div>
          </div>
        )}
      </div>
    );
  }
}
