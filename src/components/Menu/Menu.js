import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
    renderLinks () {
        const {info} = this.props;
        const links = [{
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'Карта',
            to: '/map',
            className: "visibleMenuLink"
        },
        {
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'Список деревьев',
            to: '/trees',
            className: info.role !== "admin" ? "invisibleMenuLink" : "visibleMenuLink"
        },
        {
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'Список пользователей',
            to: '/users',
            className: info.role !== "admin" ? "invisibleMenuLink" : "visibleMenuLink"
        },
        {
            activeclassname: 'active',
            exact: true,
            onClick: this.props.onClick,
            title: 'О нас',
            to: '/aboutUs',
            className: "visibleMenuLink"
        }]

        return links.map(link => {
            return (
                <NavLink
                    exact={link.exact}
                    to={link.to}
                    activeclassname={link.activeclassname}
                    onClick={link.onClick}
                    hidden={link.hidden}
                    className={link.className}
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
                <a href="#!" className="visibleMenuLink">Контакты</a>
                <a href="#!" className="visibleMenuLink" >Помощь</a>
            </div>
        )
    }
}
