import { Component } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as HorisontalLine } from "./horisontal.svg";
import { ReactComponent as VerticalLine } from "./vertical.svg";


import AttributesButtons from "../AttributesButtons";
import ImagesCarousel from "../ImagesCarousel/ImagesCarousel";

import s from './Cart.module.scss'

export default class Cart extends Component {

  findSelectedCurrencyPrice = (item, selectedCurrency) => {
        return item.prices.find(price => price.currency.label === selectedCurrency.label)
  }
  
  onIncrementClick = (productId) => {
    this.props.quantityIncrement(productId)
  };

   onDecrementClick = (productId) => {
    this.props.quantityDecrement(productId)
  }

  onLinkClick = () => {
    this.props.toggleCart();
  }


   
  calculateTotalAmount = (cart) => {
    return cart.reduce((a, v) =>
    { 
      const selectedCurrencyPrice = this.findSelectedCurrencyPrice(v, this.props.currency);
      return a + (v.quantity * selectedCurrencyPrice.amount);
    }, 0)
  }

  render() {
    const { onIncrementClick, onDecrementClick, calculateTotalAmount } = this;
    const { cart, currency, cartQuantity, dropdown, type } = this.props;
    const totalAmount = calculateTotalAmount(cart).toFixed(2);
    const tax = (totalAmount * 0.12).toFixed(2);
    return (
      <div className={s[`${type}Cart`]}>
        {type === 'dropdown' &&
        <h2 className={s.title}>
          <span>My Bag,</span> {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
        </h2>}
        {cart.map((item) => {
          const selectedCurrencyPrice = this.findSelectedCurrencyPrice(item, currency)
          return (<div className={s[`${type}Product`]} key={item.id}>
            <div className={s[`${type}InformationWrapper`]}>
            <p className={s[`${type}Brand`]}>{item.brand}</p>
            <p className={s[`${type}Name`]}>{item.name}</p>
            <p className={s[`${type}Price`]}><span>{selectedCurrencyPrice.currency.symbol}</span>{selectedCurrencyPrice.amount}</p>
              {item.attributes &&
                <AttributesButtons
                cart
                dropdown={dropdown}
                type={type}
                    product={item}
                    changeSelectedAttributes={this.props.changeSelectedAttributes}
                    attributes={item.attributes}
                    selectedAttributes={item.selectedAttributes}
              />}
              </div>
              <div className={s.quantityWrapper}>
                <button className={s[`${type}QuantityBtn`]} onClick={()=>{onIncrementClick(item.id)}}><HorisontalLine/><VerticalLine/></button>
                <p className={s[`${type}Quantity`]}>{item.quantity}</p>
                <button className={s[`${type}QuantityBtn`]} onClick={()=>{onDecrementClick(item.id)}}><HorisontalLine/></button>
            </div>
            <ImagesCarousel
              type={type}
              gallery={item.gallery}
              name={item.name}
            />
            </div>)
        })}
        {type === 'view' &&
          <>
          <p className={s.tax}>Tax: <span>{currency.symbol}{tax}</span></p> 
          <p className={s.quantity}>Qty: <span>{cartQuantity}</span></p>
          </>
}
        <p className={s[`${type}Total`]}>Total: <span>{currency.symbol}{totalAmount}</span></p>
        { type === 'dropdown' && cart.length !== 0 &&
        <div className={s.buttonsWrapper}>
          <Link className={s.link} to='/cart' onClick={this.onLinkClick}>View bag</Link>
          <button type='button' className={s.dropdownBtn}>CHECK OUT</button>
          </div>}
        { type === 'view' && cart.length !== 0 &&
          <button type='button' className={s.viewBtn}>order</button>}
      </div>

    );
  }
}
