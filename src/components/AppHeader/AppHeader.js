import { Component } from "react";
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from './a-logo.svg';

import Dropdown from "../Dropdown";

import s from "./AppHeader.module.scss";

export default class AppHeader extends Component {
    
    
    setCurrency = (currency) => {
        this.props.setCurrency(currency)
    } 

    render() {
        const { categories } = this.props;

        return (
            
            <header className={s.AppHeader}>
            <div className={s["AppHeader-container"]}>
            <nav className={s.AppMenu}>        
                {categories.map(({ name }) => (
                    <NavLink className={s["AppMenu-item"]} key={name} to={`/${name}`}>{name}</NavLink>
                ))}
            </nav>
            <Logo className={s.Logo} />
                    <Dropdown setCurrency={this.setCurrency}/>      
            </div>
            </header>
        )
    }
}