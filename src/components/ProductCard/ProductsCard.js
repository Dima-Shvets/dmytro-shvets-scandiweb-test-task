import { Component } from "react";
import { Link } from "react-router-dom";

import s from './ProductCard.module.scss';



export default class ProductCard extends Component {

    render() {
        
        const { currency: selectedCurrency } = this.props
        const { name, gallery, prices, id } = this.props.product;
        const selectedCurrencyPrice = prices.find(price => (price.currency.label === selectedCurrency))

        return (
            <Link className={s.link} to={`/${id}`}>
                <div className={s.pictureWrapper}>
                <img className={s.picture} width={354} src={gallery[0]} alt={name} />
                </div>
                <p className={s.name}>{name}</p>
                <p className={s.price}>{selectedCurrencyPrice.currency.symbol}{selectedCurrencyPrice.amount}</p>
            </Link>
        )
    }
}

