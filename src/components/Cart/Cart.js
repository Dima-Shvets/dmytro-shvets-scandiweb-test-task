import { Component } from "react";

import AttributesButtons from "../AttributesButtons";

import s from './Cart.module.scss'

export default class Cart extends Component {

    findSelectedCurrencyPrice = (item, selectedCurrency) => {
        return item.prices.find(price => (price.currency.label === selectedCurrency))
  }
  
  onIncrementClick = (productId) => {
    this.props.quantityIncrement(productId)
  };

   onDecrementClick = (productId) => {
    this.props.quantityDecrement(productId)
  }

  // Need to write reducer to calculate total ammount
  calculateTotal = (cart) => {
    cart.reduce((a, v)=> (a+ v), 0)
  }
    
  render() {
    const { onIncrementClick, onDecrementClick } = this;
    const { cart, currency } = this.props;
    const cartQuantity = cart.length;
    return (
      <div className={s.cart}>
        <h2 className={s.title}>
          <span>My Bag,</span> {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
        </h2>
        {cart.map((item) => {
            const selectedCurrencyPrice = this.findSelectedCurrencyPrice(item, currency)
          return (<div className={s.product} key={item.id}>
            <div className={s.informationWrapper}>
            <p className={s.text}>{item.brand}</p>
            <p className={s.text}>{item.name}</p>
            <p className={s.price}><span>{selectedCurrencyPrice.currency.symbol}</span>{selectedCurrencyPrice.amount}</p>
              <AttributesButtons
                    cart
                    product={item}
                    changeSelectedAttributes={this.props.changeSelectedAttributes}
                    attributes={item.attributes}
                    selectedAttributes={item.selectedAttributes}
              />
              </div>
              <div className={s.quantityWrapper}>
                <button className={s.quantityBtn} onClick={()=>{onIncrementClick(item.id)}}>+</button>
                <p className={s.quantity}>{item.quantity}</p>
                <button className={s.quantityBtn} onClick={()=>{onDecrementClick(item.id)}}>-</button>
              </div>
              <img src={item.gallery[0]} alt={item.name} className={s.image} />
          </div>)
        })}
        <p>Total {}</p>
      </div>
    );
  }
}
