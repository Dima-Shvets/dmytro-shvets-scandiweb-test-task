import { Component } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "./a-logo.svg";

import Cart from "../Cart/Cart";
import Dropdown from "../Dropdown";
import CartDropdown from "../CartDropdown/CartDropdown";

import s from "./AppHeader.module.scss";

export default class AppHeader extends Component {
  setCurrency = (currency) => {
    this.props.setCurrency(currency);
  };

  render() {
    const {
      categories,
      cartOpen,
      toggleCart,
      cart,
      currency,
      quantityIncrement,
      quantityDecrement,
      changeSelectedAttributes,
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
        <Dropdown setCurrency={this.setCurrency} />
        <CartDropdown cartOpen={cartOpen} toggleCart={toggleCart}>
          <Cart
            cart={cart}
            currency={currency}
            changeSelectedAttributes={changeSelectedAttributes}
            quantityIncrement={quantityIncrement}
            quantityDecrement={quantityDecrement}
          />
        </CartDropdown>
      </header>
    );
  }
}
