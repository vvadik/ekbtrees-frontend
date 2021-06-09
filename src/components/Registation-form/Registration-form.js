import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Registration-form.module.css';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vk.png';
import facebookIcon from '../../img/facebook.png';


export default class RegistrationForm extends Component {
    state = {
        touchStart: null,
        error: false
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
    checkPasswords = (e) =>{
        e.preventDefault();
        if(e.target.psw.value === e.target.psw2.value){
            const input = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                password : e.target.psw.value
            };
            this.register(input)
        }
        else {
            this.setState({
                error: true
            })
        }
    }
    renderError(){
        if(this.state.error){
            return(
                <p>Пароль не соответствует</p>
            )
        }
    }
    async register(input){
        const response = await fetch('/auth/register', {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(input)
        })
        if(response.ok){
            alert("Пользователь зарегистрирован")
        }
    }
    render() {
        return (
            <div>
                <FormHeader />
                <section className={styles.registrationContainer} onTouchStart={this.handleTouch} onTouchEnd={this.handleTouchEnd}>
                    <form name="registration" method="post" className={styles.registrationForm} onSubmit={this.checkPasswords}>
                        <h2>Регистрация</h2>
                        <input type="text" placeholder="Имя" name="firstName" id="userFirstName" required />
                        <input type="text" placeholder="Фамилия" name="lastName" id="userLastName" required />
                        <input type="email" placeholder="Введите почту" name="email" id="userEmail" required />
                        <input type="password" placeholder="Придумайте пароль" name="psw" id="userPassword" required />
                        <input type="password" placeholder="Подтвердите пароль" name="psw2" id="userConfirmPassword" required />

                        <div className={styles.loginMessage}>
                            {this.renderError()}
                        </div>
                        <button type="submit">Продолжить</button>

                        <p className={styles.loginMessage}>или зарегистрируйтесь с</p>
                        <div className={styles.flexSocial}>
                            <div className={styles.social}>
                                <a href="#!" target="_blank"><img src={vkIcon} alt="google-link" /></a>
                            </div>
                            <div className={styles.social}>
                                <a href="#!" target="_blank"><img src={facebookIcon} alt="facebook-link" /></a>
                            </div>
                        </div>
                        <p className={styles.privacyTerms}>© 2020 — 2021 Privacy-Terms</p>
                    </form>
                    <aside className={styles.registrationAside}>
                        <h2>Добро пожаловать!</h2>
                        <p>Введите данные, чтобы продолжить</p>
                        <NavLink className={styles.linkLogin} exact to='/login' activeclassname="active">Авторизоваться</NavLink>
                    </aside>
                </section>
            </div>
        );
    }
}
