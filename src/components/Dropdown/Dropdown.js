import { Component } from 'react';
import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

import { ReactComponent as DropdownButtonIcon } from './dropdown-button-icon.svg';


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
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    }

    onCurrencySelect = ({label, symbol}) => {
        this.setState({ selectedCurrency: symbol });
        this.props.setCurrency(label);
        this.setState({ dropdownOpen: false });
    }

    setDefaultCurrency = (currencies) => {
        if (!this.state.selectedCurrency === "") {
            return
        }
        this.setState({ selectedCurrency: currencies[0].symbol})
        this.props.setCurrency(currencies[0].label)
    }

    render() {
        return (
            <Query
                query={GET_CURRENCIES}
                onCompleted={({currencies}) => this.setDefaultCurrency(currencies)}
            >
                {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;  
                    return (
                    <div className={s.Dropdown}>
                    <p>{this.state.selectedCurrency}</p>        
                    <button
                        className={s["Dropdown-toggle"]}       
                        type="button"
                        onClick={this.onToggleClick}>
                                <DropdownButtonIcon />
                    </button>
                    {this.state.dropdownOpen && (<div className={s["Dropdown-menu"]}>
                        <ul>
                            {data.currencies.map(({label, symbol}) => (
                                <li key={label}>
                                    <button type="button" onClick={()=>this.onCurrencySelect({label, symbol})}>
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