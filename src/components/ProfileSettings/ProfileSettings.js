import React, { Component, Fragment } from 'react';
import UserInfo from '../UserInfo';
import styles from './ProfileSettings.module.css';
import cn from "classnames";

export default class ProfileSettings extends Component {
    render(){
        return(
        <Fragment>
            <UserInfo />
            <h4 className={styles.profileHeading}>Редактирование профиля</h4>
            <form className={styles.profileForm}>
                <label className={cn([styles.profileFlex, styles.flexColumn])}><span>Фото</span><input type="file" accept=".png,.jpg" className={styles.profileInput} /></label>
                <label className={styles.profileFlex}><span>Фамилия</span><input type="text" className={styles.profileInput} /></label>
                <label className={styles.profileFlex}><span>Имя</span><input type="text" className={styles.profileInput} /></label>
                <label className={styles.profileFlex}><span>Отчество</span><input type="text" className={styles.profileInput} /></label>

                <div className={styles.profileGroup}>
                    <label className={styles.profileFlex}><span>Телефон</span><input type="tel" className={styles.profileInput} /></label>
                    <label className={styles.profileFlex}><span>Эл. почта</span><input type="email" className={styles.profileInput} /></label>
                </div>
                <div className={cn([styles.profileGroup, styles.order1])}>
                    <label className={styles.profileFlex}><span>User id</span><input type="text" className={styles.profileInput} value="12345678" disabled /></label>
                </div>
                <div className={styles.profileGroup}>
                    <label className={styles.profileFlex}><span>Роль</span><input type="text" className={styles.profileInput} value="Волонтер" disabled /></label>
                    <label className={styles.profileFlex}><span>Статус</span><input type="text" className={styles.profileInput} value="Активен" disabled /></label>
                </div>
                <label className={cn([styles.profileFlex, styles.order2])}><span>О себе</span><input className={cn([styles.profileInput, styles.textInfo])} cols="25" rows="10" /></label>
                <div className={cn([styles.profileControls, styles.order3])}>
                    <button type="submit" className={styles.profileBtn}>Подтвердить</button>
                    <button type="button" className={styles.profileBtn}>Отменить</button>
                </div>
            </form>
        </Fragment>
        )
    }
}
