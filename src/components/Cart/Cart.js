import { Component } from "react";

import AttributesButtons from "../AttributesButtons";

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
    
  render() {
    const { onIncrementClick, onDecrementClick } = this;
    const { cart, currency } = this.props;
    const cartQuantity = cart.length;
    return (
      <div>
        <h2>
          My Bag, {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
        </h2>
        {cart.map((item) => {
            const selectedCurrencyPrice = this.findSelectedCurrencyPrice(item, currency)
            return (<div key={item.id}>
            <p>{item.brand}</p>
            <p>{item.name}</p>
            <p><span>{selectedCurrencyPrice.currency.symbol}</span>{selectedCurrencyPrice.amount}</p>
              <AttributesButtons
                    cart
                    product={item}
                    changeSelectedAttributes={this.props.changeSelectedAttributes}
                    attributes={item.attributes}
                    selectedAttributes={item.selectedAttributes}
              />
              <div>
                <button onClick={()=>{onIncrementClick(item.id)}}>+</button>
                <p>{item.quantity}</p>
                <button onClick={()=>{onDecrementClick(item.id)}}>-</button>
              </div>
          </div>)
        })}
      </div>
    );
  }
}
