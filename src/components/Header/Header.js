import React, { Component } from 'react';
import DesktopHeader from "../DesktopHeader/DesktopHeader";
import MobileHeader from '../MobileHeader/MobileHeader';
import styles from './Header.module.css';
import {UserContext} from "../../context/contexts";

export default class Header extends Component {
    render() {
        const {onCookieRemove} = this.props;

        return (
            <header className={styles.headerWrapper}>
                <DesktopHeader onCookieRemove={onCookieRemove} />
            </header>
        )
    }
}
