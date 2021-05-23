import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Menu from '../Menu';
import './Header.css';

export default class Header extends Component {
    
    handleClick() {
        const navBar = document.getElementById("navBar");
        const icon = document.querySelector(".fa");
        const burger = document.querySelector(".burger-btn");

        navBar.hidden = !navBar.hidden;
        navBar.hidden ? icon.style.color = "black" : icon.style.color = "white";
        navBar.hidden ? burger.style.background = "inherit" : burger.style.background = "#333333";
    }
    renderMobileHeader() {
        return (
            <div className="mobile-header">
                <div className="topnav">
                    {this.renderLogo()}
                    <button className="burger-btn" onClick={this.handleClick}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <Menu />
            </div>
        )
    }
    renderDesktopHeader() {
        return (
            <div className="desktop-header">
                <NavLink exact to='/home' activeclassname="active-logo" className="logo">
                    <h1 className="big-header">Ekb
                        <span className="small-header">Trees</span>
                    </h1>
                </NavLink>
                <div className="menu">
                    <NavLink exact to='/map' activeclassname="active">Карта</NavLink>
                    <NavLink exact to='/myTrees' activeclassname="active">Мои деревья</NavLink>
                    <a href="#!">Контакты</a>
                    <a href="#!">Помощь</a>
                </div>
                <div className="sign-links">
                    <NavLink exact to='/' activeclassname="active">Войти</NavLink>
                    <NavLink exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
                </div>
            </div>
        )
    }
    renderLogo(){
            return (
                <NavLink exact to='/home' activeclassname="active-logo" className="ekb-trees"><span className="big-header-mobile">Ekb</span><span className="small-header-mobile">Trees</span></NavLink>                
            )
    }
    render() {
        return (
            <header>
                {this.renderMobileHeader()}
                {this.renderDesktopHeader()}
            </header>
        )
    }
}
