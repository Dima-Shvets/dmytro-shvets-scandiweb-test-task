import { Component } from "react";

import AttributesButtons from "../AttributesButtons";

export default class Cart extends Component {

    findSelectedCurrencyPrice = (item, selectedCurrency) => {
        return item.prices.find(price => (price.currency.label === selectedCurrency))
    }
    
  render() {
    const { cart, currency } = this.props;
    const cartQuantity = cart.length;
    console.log(cart);
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
                    attributes={item.attributes}
                    selectedAttributes={item.selectedAttributes}
                    />
          </div>)
        })}
      </div>
    );
  }
}
