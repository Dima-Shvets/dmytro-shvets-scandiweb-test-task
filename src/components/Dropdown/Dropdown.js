import { Component } from 'react';
import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

import { ReactComponent as DropdownCloseIcon } from './dropdown-close-icon.svg';


import s from "./Dropdown.module.scss";

const GET_CURRENCIES = gql`
{
    currencies{
   	label
  	symbol
  }
}
    `

export default class Dropdown extends Component {
    state = {
        dropdownOpen: false,
        selectedCurrency: ""
    }

    onToggleClick = () => {
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }))
    }

    onCurrencySelect = (currencyLabel) => {
        this.setState({selectedCurrency: currencyLabel})
    }

    render() {
        return (
            <Query
                query={GET_CURRENCIES}
            >
                {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;  
                    return (
                    <div className={s.Dropdown}>
                    <button
                        type="button"
                        className={s["Dropdown-toggle"]}
                        onClick={this.onToggleClick}>
                        <DropdownCloseIcon />
                    </button>
                    {this.state.dropdownOpen && (<div className={s["Dropdown-menu"]}>
                        <ul>
                            {data.currencies.map(({label, symbol}) => (
                                <li key={label}>
                                    <button type="button" onClick={()=>this.onCurrencySelect(label)}>
                                        <span>{symbol}</span>
                                        {label}
                                    </button>
                                </li>    
                            )) }         
                        </ul>
                    </div>)}
                    </div>
                );
            }}
        </Query>
            
        )
    }
}