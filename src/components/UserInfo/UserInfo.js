import React, { Component } from 'react';
import styles from './UserInfo.module.css';
import Man from '../../img/man.png';
import UserMenu from '../UserMenu';
import cn from 'classnames';

export default class UserInfo extends Component {
    state = {
        openMenu: false
    }

    handleClick = () => this.setState({openMenu: !this.state.openMenu});

    renderMenu () {
        const {openMenu} = this.state;

        if (openMenu) {
            return <UserMenu />;
        }

        return null;
    }

    renderToggleButton () {
        const classNameCN = cn({
            [styles.faChevronDown]: true,
            'fa': true,
            [styles.faChevronDownActive]: this.state.openMenu
        })


        return (
            <button className={styles.userBtn} onClick={this.handleClick}>
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
                            <span className={styles.userName}>{this.props.info.firstName}</span>
                            <span className={styles.userRole}>{this.props.info.role}</span>
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
