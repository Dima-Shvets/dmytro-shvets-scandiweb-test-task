import { Component } from "react";
import { Link } from "react-router-dom";

import AttributesButtons from "../AttributesButtons";

import s from './Cart.module.scss'

export default class Cart extends Component {

  findSelectedCurrencyPrice = (item, selectedCurrency) => {
        return item.prices.find(price => price.currency.label === selectedCurrency)
  }
  
  onIncrementClick = (productId) => {
    this.props.quantityIncrement(productId)
  };

   onDecrementClick = (productId) => {
    this.props.quantityDecrement(productId)
  }

  
  calculateTotalAmount = (cart) => {
    return cart.reduce((a, v) =>
    { 
      const selectedCurrencyPrice = this.findSelectedCurrencyPrice(v, this.props.currency);
      return a + selectedCurrencyPrice.amount;
    }, 0)
  }

  render() {
    const { onIncrementClick, onDecrementClick, calculateTotalAmount } = this;
    const { cart, currency, cartQuantity, dropdown, type } = this.props;
    const totalAmount = calculateTotalAmount(cart)
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
                dropdown={dropdown}
                type={type}
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
              <img src={item.gallery[0]} alt={item.name} className={s.image} width='121' />
          </div>)
        })}
        <p className={s.total}>Total <span>{totalAmount}</span></p>
      <div className={s.buttonsWrapper}>
          <Link to='/cart' className={s.link}>View bag</Link>
          <button type='button' className={s.btn}>CHECK OUT</button>
      </div>
      </div>

    );
  }
}
