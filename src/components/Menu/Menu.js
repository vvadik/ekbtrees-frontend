import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from  './Menu.module.css';

export default class Menu extends Component {
    renderLinks () {
        const {user} = this.props;

        const links = [{
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Карта',
            to: '/map',
            className: styles.visibleMenuLink
        },
        {
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Список деревьев',
            to: '/trees',
            className: user?.role !== "admin" ? styles.invisibleMenuLink : styles.visibleMenuLink
        },
        {
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Список пользователей',
            to: '/users',
            className: user?.role !== "admin" ? styles.invisibleMenuLink : styles.visibleMenuLink
        },
        {
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'О нас',
            to: '/aboutUs',
            className: styles.visibleMenuLink
        }]

        return links.map(link => {
            return (
                <NavLink
                    exact={link.exact}
                    to={link.to}
                    activeClassName={link.activeClassName}
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
            <div id="navBar" className={styles.navBar}>
                {this.renderLinks()}
                <a href="#!" className={styles.visibleMenuLink}>Контакты</a>
                <a href="#!" className={styles.visibleMenuLink} >Помощь</a>
            </div>
        )
    }
}
