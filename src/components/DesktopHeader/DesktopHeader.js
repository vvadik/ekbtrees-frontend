import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import UserInfo from '../UserInfo';

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
					{this.renderAdminControllers()}
					<NavLink exact to='/aboutUs' activeclassname="active">О нас</NavLink>
					<a href="#!">Контакты</a>
					<a href="#!">Помощь</a>
				</div>
				{this.renderUserInfo()}
				{this.renderLoginControllers()}
			</div>
		);
	}
	renderUserInfo(){
		if(this.props.info.cookieSet){
			console.log(this.props.info)
			return(
				<UserInfo onCookieRemove={this.props.onCookieRemove} info={this.props.info}/>
			)
		}
	}
	renderLoginControllers(){
		if(!this.props.info.cookieSet){
			return(
				<div className="sign-links">
					<NavLink exact to='/login' activeclassname="active">Войти</NavLink>
					<NavLink exact to='/registration' activeclassname="active">Зарегистрироваться</NavLink>
				</div>
			)
		}
	}
	renderAdminControllers(){
		if(this.props.info.role === "admin"){
			return(
				<Fragment>
					<NavLink exact to='/trees' activeclassname="active">Список деревьев</NavLink>
					<NavLink exact to='/users' activeclassname="active">Список пользователей</NavLink>
				</Fragment>			
			)
		}
	}
	render () {
		return this.renderContent();
	}
}

export default DesktopHeader;
