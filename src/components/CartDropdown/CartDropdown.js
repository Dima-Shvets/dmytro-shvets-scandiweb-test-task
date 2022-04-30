import { Component } from "react";

import { ReactComponent as CartIcon } from "./CartIcon.svg";

import Backdrop from "../Backdrop";

import s from "./CartDropdown.module.scss";

export default class CartDropdown extends Component {
  
  render() {
    console.log(s)

    const { cartOpen, toggleCart, children } = this.props;
    return (
      <div className={s.dropdown}>
        <button className={s.toggle} type="button" onClick={toggleCart}>
          <CartIcon width="20" height="18" />
        </button>
        {/* <div className={s.quantity}>{ }</div> */}
        {cartOpen && (
          <>
            <Backdrop toggleCart={toggleCart}/>
              <div className={s.wrapper}>{children}</div>
          </>
        )}
      </div>
    );
  }
}
