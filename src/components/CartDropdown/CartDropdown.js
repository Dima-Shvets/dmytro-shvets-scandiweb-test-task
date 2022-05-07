import { Component } from "react";

import { ReactComponent as CartIcon } from "./CartIcon.svg";

import Backdrop from "../Backdrop";

import s from "./CartDropdown.module.scss";

export default class CartDropdown extends Component {
  onOutsideClick = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.props.toggleCart();
    }
  }

  render() {

    const { cartOpen, toggleCart,  children, cartQuantity } = this.props;
    const { onOutsideClick } = this;

    return (
      <div className={s.dropdown} tabIndex="0" onBlur={onOutsideClick}>
        <button className={s.toggle} type="button" onClick={toggleCart}>
          <CartIcon width="20" height="18" />
          {cartQuantity > 0 && (
            <span className={s.quantity}>{cartQuantity}</span>
          )}
        </button>

        {cartOpen && (
          <>
            <Backdrop toggleCart={toggleCart} />
            <div className={s.wrapper}>{children}</div>
          </>
        )}
      </div>
    );
  }
}
