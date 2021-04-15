import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './AuthForm.css';

export default class AuthForm extends Component {  
    render(){
        return(
            <div className="welcome">
                <NavLink exact to='/home' activeclassname="active"  className="big-header">Ekb <span className="small-header">Trees</span></NavLink>                
                <h2>Добро пожаловать!</h2>
                <p>Пожалуйста, войдите в аккаунт или зарегистрируйтесь, чтобы начать</p>
                <div className="links">
                    <NavLink className="btn-login" exact to='/' activeclassname="active-link">Войти</NavLink>
                    <NavLink className="btn-sign-up" exact to='/registration' activeclassname="active-link">Зарегистрироваться</NavLink>
                </div>
            </div>
        )
    }
}