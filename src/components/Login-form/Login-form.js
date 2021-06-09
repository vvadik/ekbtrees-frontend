import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Login-form.module.css';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vk.png';
import facebookIcon from '../../img/facebook.png';



export default class LoginForm extends Component {
    state = {
        touchStart: null,
        logged: "not logged"
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
        this.setState({
            logged: false
        })
    }
    renderMessage(){
        if(!this.state.logged)
        return(
            <p>Пользователь с данным логином и паролем не найден.</p>
        )
    }
    async authVk(e){
        e.preventDefault();
        const response = await fetch('/auth/oauth2/vk');
            console.log(response.body)
            // ReactDOM.render(response, document.getElementById('root'))

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
                        <input type="text" placeholder="Логин" name="email" id="user-email" required />
                        <input type="password" placeholder="Пароль" name="psw" id="user-password" required />
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
                                <a href="#!" target="_blank" onClick={this.authVk}><img src={vkIcon} alt="google-link" /></a>
                            </div>
                            <div className={styles.social}>
                                <a href="#!" target="_blank"><img src={facebookIcon} alt="facebook-link" /></a>
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
