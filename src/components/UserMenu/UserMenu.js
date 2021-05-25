import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.css';

export default class UserMenu extends Component {
    render() {
        return (
            <div id="userNavBar" className="user-nav-bar" hidden>
                <NavLink exact to='/myTrees' activeclassname="active"><i className="fas fa-user"></i>Мои деревья</NavLink>
                <NavLink exact to='/profileSettings' activeclassname="active"><i className="fas fa-user-cog"></i>Настройки</NavLink>
            </div>
        )
    }
}