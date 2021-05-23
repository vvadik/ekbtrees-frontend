import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import facebookIcon from '../../img/facebook.png';
import twitterIcon from '../../img/twitter.png';
import instagramIcon from '../../img/instagram.png';
import youtubeIcon from '../../img/youtube.png';
import pinterestIcon from '../../img/pinterest.png';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footerWrapper">
                <div className="footer-menu">
                    <NavLink exact to='/map' activeclassname="active">Карта</NavLink>
                    <NavLink exact to='/aboutUs' activeclassname="active">О нас</NavLink>
                    {/* <NavLink exact to='/trees' activeclassname="active">Список деревьев</NavLink> */}
                    <div className="logo">
                        <h1 className="big-header">Ekb <span className="small-header">Trees</span></h1>
                    </div>
                    {/* <NavLink exact to='/users' activeclassname="active">Список пользователей</NavLink> */}

                    <a href="#!">Контакты</a>
                    <a href="#!">Помощь</a>
                </div>
                <div className="line" />
                <div className="footer-menu under-line">
                    <NavLink exact to='/trees' activeclassname="active">Список деревьев</NavLink>
                    <NavLink exact to='/users' activeclassname="active">Список пользователей</NavLink>
                    {/* <NavLink exact to='/aboutUs' activeclassname="active">О нас</NavLink> */}
                </div>
                <div className="social">
                    <img src={facebookIcon} alt="facebook" />
                    <img src={twitterIcon} alt="twitter" />
                    <img src={instagramIcon} alt="instagram" />
                    <img src={youtubeIcon} alt="youtube" />
                    <img src={pinterestIcon} alt="pinterest" />
                </div>
                <p className="privacy-terms">© 2020 — 2021 Privacy-Terms</p>
            </footer>
        )
    }
}
