import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
    renderLinks () {
        const links = [{
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'Карта',
            to: '/map'
        },
        {
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'Список деревьев',
            to: '/trees'
        },
        {
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'Список пользователей',
            to: '/users'
        },
        {
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'О нас',
            to: '/aboutUs'
        }]

        return links.map(link => {
            return (
                <NavLink
                    exact={link.exact}
                    to={link.to}
                    activeclassname={link.activeclassname}
                    onClick={link.onClick}
                >
                    {link.title}
                </NavLink>
            );
        })
    }

    render() {
        return (
            <div id="navBar" className="nav-bar">
                {this.renderLinks()}
                <a href="#!">Контакты</a>
                <a href="#!">Помощь</a>
            </div>
        )
    }
}
