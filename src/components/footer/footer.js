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
            <footer>
                <div className="menu">
                    <NavLink exact to='/map' activeclassname="active">Карта</NavLink>
                    <NavLink exact to='/myTrees' activeclassname="active">Мои деревья</NavLink>
                    <div className="logo">
                        <h1 className="big-header">Ekb <span className="small-header">Trees</span></h1>
                    </div>
                    <a href="#!">Контакты</a>
                    <a href="#!">Помощь</a>
                </div>
                <div className="line"></div>
                <div className="social">
                    <img src={facebookIcon} alt="facebook"></img>
                    <img src={twitterIcon} alt="twitter"></img>
                    <img src={instagramIcon} alt="instagram"></img>
                    <img src={youtubeIcon} alt="youtube"></img>
                    <img src={pinterestIcon} alt="pinterest"></img>
                </div>
                <p className="privacy-terms">© 2020 — 2021 Privacy-Terms</p>
            </footer>
        )
    }
}