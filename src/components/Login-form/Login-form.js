import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import base64 from 'base-64';
import utf8 from 'utf8';
import styles from './Login-form.module.css';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vk.png';
import facebookIcon from '../../img/facebook.png';

export default class LoginForm extends Component {
    state = {
        touchStart: null,
        logged: true
    }

    handleTouch = (e) => {
        this.setState({
            touchStart: e.changedTouches[0].clientX
        })
    }
    handleTouchEnd = (e) => {
        let difference = e.changedTouches[0].clientX - this.state.touchStart;
        if (difference < -40) {
            this.pushSingUp()
        }
    }

    pushSingUp() {
        this.props.history.push('/registration');
    }
    checkLogin = (e) => {
        e.preventDefault();
        let login = e.target.login.value;
        let password = e.target.password.value;
        let value = base64.encode(`${utf8.encode(login)}:${utf8.encode(password)}`);
        this.login(value);
    }
    async login(input){
        const {handleCookie} = this.props;
        try {
            const response = await fetch('/auth/login', {
                method: "POST",
                headers: new Headers({
                    "Authorization": input,
                    'Access-Control-Allow-Origin': '*'
                }),
                body: ""
            })
            if(response.status === 401) {
                this.setState({
                    logged: false
                })
            }
        }
        catch {
            this.setState({
                logged: true
            })
            handleCookie();
        }
    }
    renderMessage(){
        if(!this.state.logged)
        return(
            <p>Пользователь с данным логином и паролем не найден.</p>
        )
    }
    render() {
        return (
            <div>
                <FormHeader />
                <section className={styles.loginContainer} onTouchStart={this.handleTouch} onTouchEnd={this.handleTouchEnd}>
                    <aside className={styles.loginAside}>
                        <h2>С возвращением!</h2>
                        <p>Войдите в аккаунт, чтобы продолжить</p>
                        <NavLink className={styles.linkRegister} exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
                    </aside>
                    <form name="authorization" action="" className={styles.loginForm} onSubmit={this.checkLogin}>
                        <h2>Вход в аккаунт</h2>
                        <input type="text" placeholder="Логин" name="login" id="userLogin" required />
                        <input type="password" placeholder="Пароль" name="password" id="userPassword" required />
                        <div className={styles.loginMessage}>
                            {this.renderMessage()}
                        </div>
                        <button type="submit">Войти</button>
                        <p className={styles.loginHelp}>
                            <NavLink className={styles.restore} exact to='/passRecovery'>Забыли пароль?</NavLink>
                        </p>
                        <p className={styles.loginMessage}>или войдите с</p>
                        <div className={styles.flexSocial}>
                            <div className={styles.social}>
                                 <NavLink to="/vk"><img src={vkIcon} alt="google-link" /></NavLink>
                            </div>
                            <div className={styles.social}>
                                <NavLink to="/fb"><img src={facebookIcon} alt="facebook-link" /></NavLink>
                            </div>
                        </div>
                        <div className={styles.flexRegister}>
                            <p>Нет аккаунта?</p><p className={styles.yellow}> <NavLink to='/registration'>Зарегистрируйтесь сейчас!</NavLink></p>
                        </div>
                        <p className={styles.privacyTerms}>© 2020 — 2021 Privacy-Terms</p>
                    </form>
                </section>
            </div>
        );
    }
}
