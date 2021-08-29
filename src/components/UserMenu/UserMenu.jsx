import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.less';
import cn from "classnames";

export default class UserMenu extends Component {
    render() {
        return (
            <div className={styles.userNavBar}>
                <NavLink exact to='/trees' activeClassName={styles.active}><i className={cn([styles.faUser, "fas", "fa-user"])} />Мои деревья</NavLink>
                <NavLink exact to='/profileSettings'  activeClassName={styles.active}><i className={cn([styles.faUser, "fas", "fa-user"])} />Настройки</NavLink>
            </div>
        )
    }
}
