import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
    render() {
        return (
            <div id="navBar" className="nav-bar" hidden>
                <NavLink exact to='/map' activeclassname="active">Карта</NavLink>
                <NavLink exact to='/myTrees' activeclassname="active">Мои деревья</NavLink>
                <a href="#!">Контакты</a>
                <a href="#!">Помощь</a>
            </div>
        )
    }
}