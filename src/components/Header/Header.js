import React, { Component } from 'react';
import DesktopHeader from "../DesktopHeader/DesktopHeader";
import MobileHeader from '../MobileHeader/MobileHeader';
import styles from './Header.module.css';

export default class Header extends Component {
    render() {
        const {onCookieRemove} = this.props;
        return (
            <header className={styles.headerWrapper}>
                <MobileHeader info = {this.props.info}/>
                <DesktopHeader onCookieRemove={onCookieRemove} info = {this.props.info}/>
            </header>
        )
    }
}
