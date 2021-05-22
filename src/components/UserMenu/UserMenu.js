import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.css';

export default class UserMenu extends Component {
    render() {
        return (
            <div id="userNavBar" className="user-nav-bar" hidden>
                <NavLink exact to='/myTrees' activeclassname="active"><i className="fas fa-user"></i>Мои деревья</NavLink>
                <NavLink exact to='/userList' activeclassname="active"><i className="fas fa-stream"></i>Список пользователей</NavLink>
                <NavLink exact to='/profileSettings' activeclassname="active"><i className="fas fa-user-cog"></i>Настройки</NavLink>
                <a href="#!"><i className="fas fa-comment"></i>О нас</a>
            </div>
        )
    }
}