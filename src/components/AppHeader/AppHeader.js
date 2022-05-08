import { Component } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "./a-logo.svg";

import Cart from "../Cart/Cart";
import CurrencyDropdown from "../CurrencyDropdown";
import CartDropdown from "../CartDropdown/CartDropdown";

import s from "./AppHeader.module.scss";

export default class AppHeader extends Component {
  state = {
    currencyDropdownOpen: false,
    cartOpen: false,
  };

  closeCart = () => {
    this.setState({ cartOpen: false });
  }

  toggleCart = () => {
    this.setState(({ cartOpen }) => ({ cartOpen: !cartOpen }));
    if (this.state.currencyDropdownOpen) {
      this.closeCart();
    }
  };

  closeCurrencyDropdown = () => {
    this.setState({ currencyDropdownOpen: false })
  }

  toggleCurrencyDropdown = () => {
    this.setState(({ currencyDropdownOpen }) => ({
      currencyDropdownOpen: !currencyDropdownOpen,
    }));
    if (this.state.cartOpen) {
      this.closeCurrencyDropdown();
    }
  };

  setCurrency = (currency) => {
    this.props.setCurrency(currency);
  };

  render() {
    const { currencyDropdownOpen, cartOpen } = this.state;
    const {
      categories,
      cart,
      currency,
      quantityIncrement,
      quantityDecrement,
      changeSelectedAttributes,
      cartQuantity,
    } = this.props;
    const { toggleCart, toggleCurrencyDropdown, setCurrency, closeCurrencyDropdown, closeCart } = this;
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
        <div className={s.logoWrapper}>
          <Logo className={s.Logo} />
        </div>
        <CurrencyDropdown
          currencyDropdownOpen={currencyDropdownOpen}
          setCurrency={setCurrency}
          toggleCurrencyDropdown={toggleCurrencyDropdown}
          closeCurrencyDropdown={closeCurrencyDropdown}
        />
        <CartDropdown
          cartOpen={cartOpen}
          cartQuantity={cartQuantity}
          toggleCart={toggleCart}
          closeCart={closeCart}
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
