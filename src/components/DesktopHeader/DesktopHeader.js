import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

export class DesktopHeader extends Component {
	renderContent () {
		return (
			<div className="desktop-header">
				<NavLink exact to='/' activeclassname="active-logo" className="logo">
					<h1 className="big-header">Ekb
						<span className="small-header">Trees</span>
					</h1>
				</NavLink>
				<div className="menu">
					<NavLink exact to='/map' activeclassname="active">Карта</NavLink>
					<NavLink exact to='/trees' activeclassname="active">Список деревьев</NavLink>
					<NavLink exact to='/users' activeclassname="active">Список пользователей</NavLink>
					<NavLink exact to='/aboutUs' activeclassname="active">О нас</NavLink>
					<a href="#!">Контакты</a>
					<a href="#!">Помощь</a>
				</div>
				<div className="sign-links">
					<NavLink exact to='/login' activeclassname="active">Войти</NavLink>
					<NavLink exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
				</div>
			</div>
		);
	}

	render () {
		return this.renderContent();
	}
}

export default DesktopHeader;
