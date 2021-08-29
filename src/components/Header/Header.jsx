import React, { Component } from 'react';
import DesktopHeader from "components/DesktopHeader";
import MobileHeader from 'components/MobileHeader';
import styles from './Header.less';

export default class Header extends Component {
    render() {
        const {onCookieRemove} = this.props;

        return (
            <header className={styles.headerWrapper}>
                <MobileHeader />
                <DesktopHeader onCookieRemove={onCookieRemove} />
            </header>
        )
    }
}
