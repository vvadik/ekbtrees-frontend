import React, { Component, Fragment } from 'react';
import styles from './ProfileSettings.module.css';
import cn from "classnames";

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.requiredFields = ['lastName', 'firstName', 'email'];
    }

    handleSubmit (event) {
        event.preventDefault();

        // const formData = new FormData(event.target)
        //
        // formData.forEach((value, key) => {
        //     if (!formDataExcludedFields.includes(key)) {
        //         data[key] = value
        //     }
        //     if (key === "species") {
        //         data[key] = {"id": value}
        //     }
        // });
    }

    render () {
        const {user} = this.props;

        return (
        <Fragment>
            <h4 className={styles.profileHeading}>Редактирование профиля</h4>
            <form className={styles.profileForm} onSubmit={this.handleSubmit}>
                <label className={cn([styles.profileFlex, styles.flexColumn])}>
                    <span>Фото</span>
                    <input type="file" accept=".png,.jpg" className={styles.profileInput} />
                </label>
                <label className={styles.profileFlex}>
                    <span>Фамилия</span>
                    <input required name="lastName" defaultValue={user.lastName} type="text" className={styles.profileInput} />
                </label>
                <label className={styles.profileFlex}>
                    <span>Имя</span>
                    <input required name="firstName" defaultValue={user.firstName} type="text" className={styles.profileInput} />
                </label>
                <label className={styles.profileFlex}>
                    <span>Отчество</span>
                    <input name="patronymic" type="text" className={styles.profileInput} />
                </label>

                <div className={styles.profileGroup}>
                    <label className={styles.profileFlex}>
                        <span>Телефон</span>
                        <input name="phone" type="tel" className={styles.profileInput} />
                    </label>
                    <label className={styles.profileFlex}>
                        <span>Эл. почта</span>
                        <input required name="email" defaultValue={user.email} type="email" className={styles.profileInput} />
                    </label>
                </div>
                <div className={cn([styles.profileGroup, styles.order1])}>
                    <label className={styles.profileFlex}>
                        <span>User id</span>
                        <input name="id" type="text" className={styles.profileInput} defaultValue={user.id} disabled />
                    </label>
                </div>
                <div className={styles.profileGroup}>
                    <label className={styles.profileFlex}>
                        <span>Роль</span>
                        <input name="role" type="text" className={styles.profileInput} defaultValue={user.role} disabled />
                    </label>
                    <label className={styles.profileFlex}>
                        <span>Статус</span>
                        <input name="status" type="text" className={styles.profileInput} value="Активен" disabled />
                    </label>
                </div>
                <label className={cn([styles.profileFlex, styles.order2])}>
                    <span>О себе</span>
                    <input name="aboutUs" className={cn([styles.profileInput, styles.textInfo])} cols="25" rows="10" />
                </label>
                <div className={cn([styles.profileControls, styles.order3])}>
                    <button type="submit" className={styles.profileBtn}>Подтвердить</button>
                    <button type="button" className={styles.profileBtn}>Отменить</button>
                </div>
            </form>
        </Fragment>
        )
    }
}
