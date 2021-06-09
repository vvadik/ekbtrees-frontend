import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from  './Menu.module.css';

export default class Menu extends Component {
    renderLinks () {
        const links = [{
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Карта',
            to: '/map'
        },
        {
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Список деревьев',
            to: '/trees'
        },
        {
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Список пользователей',
            to: '/users'
        },
        {
            activeClassName: styles.active,
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
                    activeClassName={link.activeClassName}
                    onClick={link.onClick}
                >
                    {link.title}
                </NavLink>
            );
        })
    }

    render() {
        return (
            <div id="navBar" className={styles.navBar}>
                {this.renderLinks()}
                <a href="#!">Контакты</a>
                <a href="#!">Помощь</a>
            </div>
        )
    }
}
