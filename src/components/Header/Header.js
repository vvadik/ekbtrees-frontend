import React, { Component } from 'react';
import DesktopHeader from "../DesktopHeader/DesktopHeader";
import MobileHeader from '../MobileHeader/MobileHeader';
import styles from './Header.module.css';

export default class Header extends Component {
    render() {
        return (
            <header className={styles.headerWrapper}>
                <MobileHeader />
                <DesktopHeader />
            </header>
        )
    }
}
