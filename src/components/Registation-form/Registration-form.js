import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Registration-form.css';
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
                <section className="registration-container" onTouchStart={this.handleTouch} onTouchEnd={this.handleTouchEnd}>
                    <form name="registration" method="post" className="registration-form" onSubmit={this.checkPasswords}>
                        <h2>Регистрация</h2>
                        <input type="text" placeholder="Имя" name="firstName" id="userFirstName" required />
                        <input type="text" placeholder="Фамилия" name="lastName" id="userLastName" required />
                        <input type="email" placeholder="Введите почту" name="email" id="userEmail" required />
                        <input type="password" placeholder="Придумайте пароль" name="psw" id="userPassword" required />
                        <input type="password" placeholder="Подтвердите пароль" name="psw2" id="userConfirmPassword" required />
                       
                        <div className="login-message">
                            {this.renderError()}
                        </div> 
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