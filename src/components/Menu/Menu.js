import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from  './Menu.module.css';
import {UserContext} from "../../context/contexts";

export default class Menu extends Component {
    renderLinks () {
        const user = this.context;

        let links = [{
            activeClassName: styles.active,
            exact: true,
            onClick: this.props.onClick,
            title: 'Карта',
            to: '/map',
            className: styles.visibleMenuLink
        }]
        // {
        //     activeClassName: styles.active,
        //     exact: true,
        //     onClick: this.props.onClick,
        //     title: 'Список пользователей',
        //     to: '/users',
        //     className: user?.role !== "admin" ? styles.invisibleMenuLink : styles.visibleMenuLink
        // },
        // {
        //     activeClassName: styles.active,
        //     exact: true,
        //     onClick: this.props.onClick,
        //     title: 'О нас',
        //     to: '/aboutUs',
        //     className: styles.visibleMenuLink
        // }]

        const authLinks = [];

        if (user) {
            authLinks.push({
                activeClassName: styles.active,
                exact: true,
                onClick: this.props.onClick,
                title: 'Список деревьев',
                to: '/trees',
                className: styles.visibleMenuLink
            })
        } else {
            authLinks.push({
                    activeClassName: styles.active,
                    exact: true,
                    onClick: this.props.onClick,
                    title: 'Войти',
                    to: '/login',
                    className: styles.visibleMenuLink
                },
                {
                    activeClassName: styles.active,
                    exact: true,
                    onClick: this.props.onClick,
                    title: 'Регистрация',
                    to: '/registration',
                    className: styles.visibleMenuLink
                })
        }

        links = links.concat(authLinks);

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
                {/*<a href="#!" className={styles.visibleMenuLink}>Контакты</a>*/}
                {/*<a href="#!" className={styles.visibleMenuLink} >Помощь</a>*/}
            </div>
        )
    }
}

Menu.contextType = UserContext;
