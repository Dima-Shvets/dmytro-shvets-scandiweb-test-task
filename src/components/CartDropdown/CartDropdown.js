import { Component } from "react";

import { ReactComponent as CartIcon } from './CartIcon.svg';

import s from "./CartDropdown.module.scss";

export default class CartDropdown extends Component { 

    render() {
        const { cartOpen, toggleCart, children } = this.props;
        
        return (
            <div>
                <button
                    className={s.toggle}
                    type="button"
                    onClick={toggleCart}>
                    <CartIcon />
                </button>
                {cartOpen && <div>
                    <div>
                        {children}
                    </div>
                </div>}
            </div>
        )
    }
}