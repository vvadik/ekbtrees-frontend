import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Login-form.css';
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
    render() {
        const {handleCookie} = this.props;
        return (
            <div>
                <FormHeader />
                <section className="login-container" onTouchStart={this.handleTouch} onTouchEnd={this.handleTouchEnd}>
                    <aside className="login-aside">
                        <h2>С возвращением!</h2>
                        <p>Войдите в аккаунт, чтобы продолжить</p>
                        <NavLink className="link-register" exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
                    </aside>
                    <form name="authorization" action="" className="login-form" onSubmit={this.checkLogin}>
                        <h2>Вход в аккаунт</h2>
                        <input type="text" placeholder="Логин" name="email" id="user-email" required />
                        <input type="password" placeholder="Пароль" name="psw" id="user-password" required />
                        <div className="login-message">
                            {this.renderMessage()}
                        </div> 
                        <button type="submit">Войти</button>
                        <p className="login-help">
                            <NavLink className="restore" exact to='/passRecovery'>Забыли пароль?</NavLink>
                        </p>
                        <p className="login-message">или войдите с</p>
                        <div className="flex-social">
                            <div className="social">
                                {/* <NavLink to="/vk"><img src={vkIcon} alt="google-link"></img></NavLink> */}
                                <Link to="#!" onClick={handleCookie}><img src={vkIcon} alt="google-link"></img></Link>
                            </div>
                            <div className="social">
                                <NavLink to="/fb"><img src={facebookIcon} alt="facebook-link"></img></NavLink>
                            </div>
                        </div>
                        <div className="flex-register">
                            <p>Нет аккаунта?</p><p className="yellow"> <NavLink to='/registration'>Зарегистрируйтесь сейчас!</NavLink></p>
                        </div>
                        <p className="privacy-terms">© 2020 — 2021 Privacy-Terms</p>
                    </form>
                </section>
            </div>
        );
    }
}
