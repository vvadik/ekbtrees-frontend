import React, { Component, Fragment } from 'react';
import UserInfo from '../UserInfo';
import './ProfileSettings.css';

export default class ProfileSettings extends Component {
    render(){
        return(
        <Fragment>
            <UserInfo />
            <h4 className="profile-heading">Редактирование профиля</h4>
            <form className="profile-form">
                <label className="profile-flex flex-column"><span>Фото</span><input type="file" accept=".png,.jpg" className="profile-input"></input></label>
                <label className="profile-flex"><span>Фамилия</span><input type="text" className="profile-input"></input></label>
                <label className="profile-flex"><span>Имя</span><input type="text" className="profile-input"></input></label>
                <label className="profile-flex"><span>Отчество</span><input type="text" className="profile-input"></input></label>
                
                <div className="profile-group">
                    <label className="profile-flex"><span>Телефон</span><input type="tel" className="profile-input"></input></label>
                    <label className="profile-flex"><span>Эл. почта</span><input type="email" className="profile-input"></input></label>                
                </div>
                <div className="profile-group order-1">
                    <label className="profile-flex"><span>User id</span><input type="text" className="profile-input" value="12345678" disabled></input></label>
                </div>
                <div className="profile-group">
                    <label className="profile-flex"><span>Роль</span><input type="text" className="profile-input" value="Волонтер" disabled></input></label>
                    <label className="profile-flex"><span>Статус</span><input type="text" className="profile-input" value="Активен" disabled></input></label>
                </div>
                <label className="profile-flex order-2"><span>О себе</span><input className="profile-input text-info" cols="25" rows="10" ></input></label>
                <div className="profile-controls order-3">
                    <button type="submit" className="profile-btn">Подтвердить</button>
                    <button type="button" className="profile-btn">Отменить</button>
                </div>
            </form>
        </Fragment>
        )
    }
}