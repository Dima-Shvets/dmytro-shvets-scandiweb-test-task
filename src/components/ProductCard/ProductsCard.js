import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import classnames from "classnames";

import s from "./ProductCard.module.scss";

class ProductCard extends Component {
  render() {
    const { currency: selectedCurrency } = this.props;

    const { brand, name, gallery, prices, id, inStock } = this.props.product;

    const selectedCurrencyPrice = prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
    return (
      <Link
        className={s.link}
        to={`${this.props.match.url}/${id}`}
        onClick={this.onClick}
      >
        <div className={s.pictureWrapper}>
          <img className={s.picture} width={354} src={gallery[0]} alt={name} />
          {!inStock && <div className={s.pictureOverlay}>OUT OF STOCK</div>}
        </div>
        <div id={id} className={s.textWrapper}>
          <p className={classnames(s.name, { [s["out-of-stock"]]: !inStock })}>
            {brand} {name}
          </p>
          <p className={classnames(s.price, { [s["out-of-stock"]]: !inStock })}>
            {selectedCurrencyPrice.currency.symbol}
            {selectedCurrencyPrice.amount}
          </p>
        </div>
      </Link>
    );
  }
}

export default withRouter(ProductCard);
