import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Registration-form.css';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vk.png';
import facebookIcon from '../../img/facebook.png';


export default class RegistrationForm extends Component {
    state = {
        touchStart: null
    }
    handleTouch = (e) => {
        this.setState({
            touchStart: e.changedTouches[0].clientX
        })
    }
    handleTouchEnd = (e) => {
        let difference = e.changedTouches[0].clientX - this.state.touchStart;
        if (difference > 40) {
            this.pushLogin()
        }
    }
    pushLogin() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <FormHeader />
                <section className="registration-container" onTouchStart={this.handleTouch} onTouchEnd={this.handleTouchEnd}>
                    <form name="registration" action="" className="registration-form">
                        <h2>Регистрация</h2>
                        <input type="text" placeholder="Придумайте имя пользователя" name="login" id="user-login" required />
                        <input type="email" placeholder="Введите почту" name="email" id="user-email" required />
                        <input type="password" placeholder="Придумайте пароль" name="psw" id="user-password" required />
                        <input type="password" placeholder="Подтвердите пароль" name="psw-2" id="user-confirm-password" required />
                        <button type="submit">Продолжить</button>

                        <p className="login-message">или зарегистрируйтесь с</p>
                        <div className="flex-social">
                            <div className="social">
                                <a href="#!" target="_blank"><img src={vkIcon} alt="google-link"></img></a>
                            </div>
                            <div className="social">
                                <a href="#!" target="_blank"><img src={facebookIcon} alt="facebook-link"></img></a>
                            </div>
                        </div>
                        <p className="privacy-terms">© 2020 — 2021 Privacy-Terms</p>
                    </form>
                    <aside className="registration-aside">
                        <h2>Добро пожаловать!</h2>
                        <p>Введите данные, чтобы продолжить</p>
                        <NavLink className="link-login" exact to='/' activeclassname="active">Авторизоваться</NavLink>
                    </aside>
                </section>
            </div>
        );
    }
}