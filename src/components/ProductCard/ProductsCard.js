import { Component } from "react";
import { Link } from "react-router-dom";

import s from './ProductCard.module.scss';



export default class ProductCard extends Component {

    render() {
        
        const { currency: selectedCurrency } = this.props
        // console.log(this.props.currency)
        const { name, gallery, prices, id } = this.props.product;
        const selectedCurrencyPrice = prices.find(price => (price.currency.label === selectedCurrency))

        return (
            <Link className={s.link} to={{pathname: `/${id}`}}>
                <img width={300} src={gallery[0]} alt={name}/>
                <p>{name}</p>
                <p><span>{selectedCurrencyPrice.currency.symbol}</span>{selectedCurrencyPrice.amount}</p>
            </Link>
        )
    }
}

