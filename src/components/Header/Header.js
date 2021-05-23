import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Menu from '../Menu';
import './Header.css';

export default class Header extends Component {
    state = {
        openMenu: false
    };

    handleClick = () => this.setState({openMenu: !this.state.openMenu});

    renderMenu () {
        const {openMenu} = this.state;
        return openMenu ? <Menu /> : null;
    }

    renderMobileHeader() {
        return (
            <div className="mobile-header">
                <div className="topnav">
                    {this.renderLogo()}
                    <button className="burger-btn" onClick={this.handleClick}>
                        <i className="fa fa-bars" />
                    </button>
                </div>
                {this.renderMenu()}
            </div>
        )
    }
    renderDesktopHeader() {
        return (
            <div className="desktop-header">
                <NavLink exact to='/' activeclassname="active-logo" className="logo">
                    <h1 className="big-header">Ekb
                        <span className="small-header">Trees</span>
                    </h1>
                </NavLink>
                <div className="menu">
                    <NavLink exact to='/map' activeclassname="active">Карта</NavLink>
                    <NavLink exact to='/trees' activeclassname="active">Список деревьев</NavLink>
                    <NavLink exact to='/users' activeclassname="active">Список пользователей</NavLink>
                    <NavLink exact to='/aboutUs' activeclassname="active">О нас</NavLink>
                    <a href="#!">Контакты</a>
                    <a href="#!">Помощь</a>
                </div>
                <div className="sign-links">
                    <NavLink exact to='/login' activeclassname="active">Войти</NavLink>
                    <NavLink exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
                </div>
            </div>
        )
    }
    renderLogo(){
            return (
                <NavLink exact to='/' activeclassname="active-logo" className="ekb-trees"><span className="big-header-mobile">Ekb</span><span className="small-header-mobile">Trees</span></NavLink>
            )
    }
    render() {
        return (
            <header className="headerWrapper">
                {this.renderMobileHeader()}
                {this.renderDesktopHeader()}
            </header>
        )
    }
}
