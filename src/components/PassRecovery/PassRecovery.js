import React, { Component, Fragment} from 'react';
import './PassRecovery.css';

export default class PassRecovery extends Component{
    render(){
        return(
            <Fragment>
                <h4 className="profile-heading">Восстановление пароля</h4>
                <form className="recovery-form">
                    <h4 className="recovery-heading">Забыли пароль?</h4>
                    <p className="recovery-text">Пожалуйста, введите номер телефона или адрес электронной почты для восстановления пароля.</p>
                    <label className="profile-flex recovery"><span>Телефон</span><input type="tel" className="profile-input recovery-input"></input></label>
                    <p className="recovery-text">Или</p>
                    <label className="profile-flex recovery"><span>Email</span><input type="email" className="profile-input recovery-input"></input></label>
                    <button type="submit" className="profile-btn recovery-btn">Отправить</button>
                </form>
            </Fragment>
        )
    }
}