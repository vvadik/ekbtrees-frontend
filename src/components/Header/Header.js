import React, { Component } from 'react';
import DesktopHeader from "../DesktopHeader/DesktopHeader";
import MobileHeader from '../MobileHeader/MobileHeader';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="headerWrapper">
                <MobileHeader />
                <DesktopHeader />
            </header>
        )
    }
}
