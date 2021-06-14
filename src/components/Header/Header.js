import React, { Component } from 'react';
import DesktopHeader from "../DesktopHeader/DesktopHeader";
import MobileHeader from '../MobileHeader/MobileHeader';
import styles from './Header.module.css';

export default class Header extends Component {
    render() {
        const {onCookieRemove} = this.props;
        return (
            <header className={styles.headerWrapper}>
                <MobileHeader user = {this.props.user}/>
                <DesktopHeader onCookieRemove={onCookieRemove} user = {this.props.user}/>
            </header>
        )
    }
}
