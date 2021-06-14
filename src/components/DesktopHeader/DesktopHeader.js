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
		if(this.props.user){
			return(
				<UserInfo onCookieRemove={this.props.onCookieRemove} user={this.props.user}/>
			)
		}
	}
	renderLoginControllers(){
		if(!this.props.user){
			return(
				<div className={styles.signLinks}>
					<NavLink exact to='/login' activeClassName={styles.activeSignLinks}>Войти</NavLink>
					<NavLink exact to='/registration' activeClassName={styles.activeSignLinks}>Зарегистрироваться</NavLink>
				</div>
			)
		}
	}
	renderAdminControllers(){
		const {user} = this.props;

		if(user?.role === "admin") {
			return(
				<>
					<NavLink exact to='/trees' activeClassName={styles.activeLink}>Список деревьев</NavLink>
					<NavLink exact to='/users' activeClassName={styles.activeLink}>Список пользователей</NavLink>
				</>
			)
		}

		return null
	}
	render () {
		return this.renderContent();
	}
}

export default DesktopHeader;
