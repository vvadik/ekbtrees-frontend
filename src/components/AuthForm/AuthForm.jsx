import React, {Component} from 'react';
import styles from './AuthForm.less';
import {ENTRIES} from "../../constants/entries";
import cn from "classnames";

const LINKS = [
    {
        activeLink: 'login',
        href: ENTRIES.LOGIN,
        className: styles.btnLogin,
        text: 'Войти'
    },
    {
        activeLink: 'registration',
        href: ENTRIES.REGISTRATION,
        className: styles.btnSignUp,
        text: 'Зарегистрироваться'
    }]

export default class AuthForm extends Component {
    renderLinks () {
        const {activeLink} = this.props;

        return LINKS.map(link => {
            const CN = cn({
                [link.className]: true,
                [styles.active]: link.activeLink === activeLink
            })

            return <a href={link.href} className={CN}>{link.text}</a>;
        })
    }

    render() {
        if (window.scrollY !== 0) {
            window.scrollTo(0, 0);
        }

        return(
            <div className={styles.welcome}>
                <h2 className={styles.title}>Добро пожаловать!</h2>
                <div className={styles.links}>
                    {this.renderLinks()}
                </div>
            </div>
        )
    }
}
