import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
    render() {
        return (
            <div id="navBar" className="nav-bar" hidden>
                <NavLink exact to='/map' activeclassname="active">Карта</NavLink>
                <NavLink exact to='/myTrees' activeclassname="active">Список деревьев</NavLink>
                <NavLink exact to='/userList' activeclassname="active">Список пользователей</NavLink>
                <NavLink exact to='/aboutUs' activeclassname="active">О нас</NavLink>
                <a href="#!">Контакты</a>
                <a href="#!">Помощь</a>
            </div>
        )
    }
}