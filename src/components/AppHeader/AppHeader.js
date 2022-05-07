import { Component } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "./a-logo.svg";

import Cart from "../Cart/Cart";
import CurrencyDropdown from "../CurrencyDropdown";
import CartDropdown from "../CartDropdown/CartDropdown";

import s from "./AppHeader.module.scss";

export default class AppHeader extends Component {
  state = {
    currencyDropdownIsopen: false,
  }

  setCurrency = (currency) => {
    this.props.setCurrency(currency);
  };

  render() {
    const {
      currencyDropdownIsopen
    } = this.state;
    const {
      categories,
      cartOpen,
      toggleCart,
      cart,
      currency,
      quantityIncrement,
      quantityDecrement,
      changeSelectedAttributes,
      cartQuantity,
    } = this.props;
    return (
      <header className={s.AppHeader}>
        <nav className={s.AppMenu}>
          {categories.map(({ name }) => (
            <NavLink
              className={s.link}
              activeClassName={s.active}
              key={name}
              to={`/${name}`}
            >
              {name}
            </NavLink>
          ))}
        </nav>
        <Logo className={s.Logo} />
        <CurrencyDropdown setCurrency={this.setCurrency} />
        <CartDropdown
          cartOpen={cartOpen}
          toggleCart={toggleCart}
          cartQuantity={cartQuantity}
        >
          <Cart
            type="dropdown"
            cart={cart}
            currency={currency}
            cartQuantity={cartQuantity}
            changeSelectedAttributes={changeSelectedAttributes}
            quantityIncrement={quantityIncrement}
            quantityDecrement={quantityDecrement}
            toggleCart={toggleCart}
          />
        </CartDropdown>
      </header>
    );
  }
}
