import { Component } from "react";
import { Query } from "@apollo/react-components";
import { ReactComponent as DropdownButtonIcon } from "./dropdown-button-icon.svg";

import { GET_CURRENCIES } from "../../graphql/queries";

import s from "./CurrencyDropdown.module.scss";


export default class Dropdown extends Component {
  state = {
    selectedCurrency: "",
  };

  onCurrencySelect = ({ label, symbol }) => {
    this.setState({ selectedCurrency: symbol });
    this.props.setCurrency({ label, symbol });
    this.props.closeCurrencyDropdown();
  };

  setDefaultCurrency = (currencies) => {
    if (!this.state.selectedCurrency === "") {
      return;
    }
    this.setState({ selectedCurrency: currencies[0].symbol });
    this.props.setCurrency(currencies[0]);
  };

  onOutsideClick = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.props.closeCurrencyDropdown();
    }
  }

  render() {
    const { selectedCurrency, } = this.state;
    const { currencyDropdownOpen, toggleCurrencyDropdown } = this.props;
    const { onCurrencySelect, onOutsideClick } = this;

    return (
      <Query
        query={GET_CURRENCIES}
        onCompleted={({ currencies }) => this.setDefaultCurrency(currencies)}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <div className={s.dropdown} tabIndex="0" onBlur={onOutsideClick}>
              <button
                className={`${s.toggle} ${currencyDropdownOpen ? s.reversed : ""}`}
                type="button"
                onClick={toggleCurrencyDropdown}
              >
                <span className={s.symbol}>{selectedCurrency}</span>
                <DropdownButtonIcon />
              </button>
              {currencyDropdownOpen && (
                <ul className={s.dropdownMenu} >
                  {data.currencies.map(({ label, symbol }) => (
                    <li key={label}>
                      <button
                        className={s.button}
                        type="button"
                        onClick={() => onCurrencySelect({ label, symbol })}
                      >
                        <span>{symbol}</span>
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
