import { Component } from "react";

import Cart from "../../components/Cart";

import s from "./CartView.module.scss";

export default class CartView extends Component {
  render() {
    const {
      cart,
      currency,
      changeSelectedAttributes,
      quantityIncrement,
      quantityDecrement,
      cartQuantity,
    } = this.props;
    return (
      <section className={s.section}>
        <h2 className={s.title}>Cart</h2>
        <Cart
          type="view"
          cart={cart}
          currency={currency}
          cartQuantity={cartQuantity}
          changeSelectedAttributes={changeSelectedAttributes}
          quantityIncrement={quantityIncrement}
          quantityDecrement={quantityDecrement}
        />
      </section>
    );
  }
}
