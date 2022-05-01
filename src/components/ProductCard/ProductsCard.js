import { Component } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "./cart-icon.svg";

import s from "./ProductCard.module.scss";

export default class ProductCard extends Component {
 
  render() {
    const { currency: selectedCurrency, addToCart } = this.props;
    const { name, gallery, prices, id } = this.props.product;
    const selectedCurrencyPrice = prices.find(
      (price) => price.currency.label === selectedCurrency
    );

    return (
      <Link className={s.link} to={`/${id}`} onClick={this.onClick}>
        <img className={s.picture} width={354} src={gallery[0]} alt={name} />
        <div className={s.textWrapper}>
          <p className={s.name}>{name}</p>
          <p className={s.price}>
            {selectedCurrencyPrice.currency.symbol}
            {selectedCurrencyPrice.amount}
          </p>
          <button className={s.cartBtn} onClick={() => addToCart(id)}>
            <CartIcon />
          </button>
        </div>
      </Link>
    );
  }
}
