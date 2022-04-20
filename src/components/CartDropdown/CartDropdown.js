import { Component } from "react";

import Cart from "../Cart/Cart";
import { ReactComponent as CartIcon } from './CartIcon.svg';

import s from "./CartDropdown.module.scss";

export default class CartDropdown extends Component { 

    render() {
        const { cartOpen, toggleCart, cart, currency } = this.props;
        
        return (
            <div>
                <button
                    type="button"
                    onClick={toggleCart}>
                    <CartIcon />
                </button>
                {cartOpen && <div>
                    <div>
                        <Cart
                            cart={cart}
                            currency={currency}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}