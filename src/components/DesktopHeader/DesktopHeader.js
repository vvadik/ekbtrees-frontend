import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from './DesktopHeader.module.css';
import UserInfo from '../UserInfo';

export class DesktopHeader extends Component {
	renderContent () {
		return (
			<div className={styles.desktopHeader}>
				<NavLink exact to='/' className={styles.logo}>
					<h1 className={styles.bigHeader}>Ekb
						<span className={styles.smallHeader}>Trees</span>
					</h1>
				</NavLink>
				<div className={styles.menu}>
					<NavLink exact to='/map' activeClassName={styles.activeLink}>Карта</NavLink>
					{this.renderAdminControllers()}
					<NavLink exact to='/aboutUs' activeClassName={styles.activeLink}>О нас</NavLink>
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
				<div className={styles.signLinks}>
					<NavLink exact to='/login' activeClassName={styles.activeSignLinks}>Войти</NavLink>
					<NavLink exact to='/registration' activeClassName={styles.activeSignLinks}>Зарегистрироваться</NavLink>
				</div>
			)
		}
	}
	renderAdminControllers(){
		if(this.props.info.role === "admin"){
			return(
				<>
					<NavLink exact to='/trees' activeClassName={styles.activeLink}>Список деревьев</NavLink>
					<NavLink exact to='/users' activeClassName={styles.activeLink}>Список пользователей</NavLink>
				</>
			)
		}
	}
	render () {
		return this.renderContent();
	}
}

export default DesktopHeader;
