import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.css';

export default class UserMenu extends Component {
    render() {
        return (
            <div id="userNavBar" className="user-nav-bar" hidden>
                <NavLink exact to='/trees' activeclassname="active"><i className="fas fa-user" />Мои деревья</NavLink>
                <NavLink exact to='/profileSettings' activeclassname="active"><i className="fas fa-user-cog" />Настройки</NavLink>
            </div>
        )
    }
}
