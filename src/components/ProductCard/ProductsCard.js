import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import s from "./ProductCard.module.scss";

class ProductCard extends Component {
  render() {
    const { currency: selectedCurrency } = this.props;

    const { name, gallery, prices, id } = this.props.product;

    const selectedCurrencyPrice = prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );

    return (
      <Link
        className={s.link}
        to={`${this.props.match.url}/${id}`}
        onClick={this.onClick}
      >
        <img className={s.picture} width={354} src={gallery[0]} alt={name} />
        <div id={id} className={s.textWrapper}>
          <p className={s.name}>{name}</p>
          <p className={s.price}>
            {selectedCurrencyPrice.currency.symbol}
            {selectedCurrencyPrice.amount}
          </p>
        </div>
      </Link>
    );
  }
}

export default withRouter(ProductCard);
