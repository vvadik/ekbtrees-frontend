import React, { Component } from 'react';
import styles from './UserInfo.module.css';
import Man from '../../img/man.png';
import UserMenu from '../UserMenu';
import cn from 'classnames';
import {closest} from '../../helpers/dom';

const DOCUMENT_ELEMENT = window.document.documentElement;

export const supportsTouchEvents = () => 'ontouchstart' in window || navigator.msMaxTouchPoints;

const event = supportsTouchEvents() ? 'touchend' : 'mousedown';

export default class UserInfo extends Component {
    menu = null;

    button = null;

    isSmallScreen = DOCUMENT_ELEMENT.clientWidth < 768;

    state = {
        openMenu: false
    }

    componentDidMount () {
        !this.isSmallScreen && window.document.addEventListener(event, this.handleOutsideClick);
    }

    componentWillUnmount () {
        !this.isSmallScreen && window.document.removeEventListener(event, this.handleOutsideClick);
    }

    handleClick = () => this.setState({openMenu: !this.state.openMenu});

    handleOutsideClick = (e) => {
        if (this.button && this.state.openMenu) {
            const button = closest(e.target, `.${styles.userBtn}`);
            const menu = closest(e.target, `.${styles.userMenuWrapper}`);

            if (
                (!button.length || (button.length && button[0] !== this.button))
                && (!menu.length || (menu.length && menu[0] !== this.menu))
            ) {
                this.setState({openMenu: false});
            }
        }
    };

    refMenu = (ref) => {
        this.menu = ref;
    }

    renderMenu () {
        const {openMenu} = this.state;

        if (openMenu) {
            return (
                <div className={styles.userMenuWrapper} ref={this.refMenu}>
                    <UserMenu />
                </div>
            );
        }

        return null;
    }

    refButton = (ref) => {
        this.button = ref;
    }

    renderToggleButton () {
        const classNameCN = cn({
            [styles.faChevronDown]: true,
            'fa': true,
            [styles.faChevronDownActive]: this.state.openMenu
        })


        return (
            <button className={styles.userBtn} onClick={this.handleClick} ref={this.refButton}>
                <i className={classNameCN} aria-hidden="true" />
            </button>
        )
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.userContainer}>
                    <div className={styles.user}>
                        <div>
                            <span className={styles.userName}>{this.props.user.firstName}</span>
                            <span className={styles.userRole}>{this.props.user.role}</span>
                        </div>
                        <img src={Man} className={styles.userIcon} alt="profile-icon" />
                        {this.renderToggleButton()}
                    </div>
                    <div className={styles.userControls}>
                        <i className={cn([styles.faBell, "fa"])} aria-hidden="true" />
                        <i className={cn([styles.faSignOut, "fa"])} aria-hidden="true" onClick={this.props.onCookieRemove} />
                    </div>
                </div>
                {this.renderMenu()}
            </div>
        )
    }
}
