import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './AuthForm.module.css';

export default class AuthForm extends Component {
    render() {
        if (window.scrollY !== 0) {
            window.scrollTo(0, 0);
        }

        return(
            <div className={styles.welcome}>
                <NavLink to='/' className={styles.bigHeader}>Ekb <span className={styles.smallHeader}>Trees</span></NavLink>
                <h2>Добро пожаловать!</h2>
                <p>Пожалуйста, войдите в аккаунт или зарегистрируйтесь, чтобы начать</p>
                <div className={styles.links}>
                    <NavLink className={styles.btnLogin} to='/login' activeClassName={styles.active}>Войти</NavLink>
                    <NavLink className={styles.btnSignUp} to='/registration' activeClassName={styles.active}>Зарегистрироваться</NavLink>
                </div>
            </div>
        )
    }
}
