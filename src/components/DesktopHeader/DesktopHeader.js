import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from './DesktopHeader.module.css';
import UserInfo from '../UserInfo';
import {UserContext} from "../../context/contexts";

export class DesktopHeader extends Component {
	static defaultProps = {
		onCookieRemove: null,
	}

	renderUserLinks () {
		const user = this.context;

		if (user) {
			return (
				<a exact to='/trees' activeClassName={styles.activeLink}>Список деревьев</a>
			)
		}
	}

	renderContent () {
		return (
			<div className={styles.desktopHeader}>
				<a exact to='/' className={styles.logo}>
					<h1 className={styles.bigHeader}>Ekb
						<span className={styles.smallHeader}>Trees</span>
					</h1>
				</a>
				<div className={styles.menu}>
					<a exact to='/map' activeClassName={styles.activeLink}>Карта</a>
					{this.renderUserLinks()}
					{this.renderAdminControllers()}
					{/*<NavLink exact to='/aboutUs' activeClassName={styles.activeLink}>О нас</NavLink>*/}
					{/*<a href="#!">Контакты</a>*/}
					{/*<a href="#!">Помощь</a>*/}
				</div>
				{this.renderUserInfo()}
				{this.renderLoginControllers()}
			</div>
		);
	}
	renderUserInfo() {
		if (this.context) {
			return(
				<UserInfo onCookieRemove={this.props.onCookieRemove} />
			)
		}
	}
	renderLoginControllers(){
		if(!this.context){
			return(
				<div className={styles.signLinks}>
					<a exact to='/login' activeClassName={styles.activeSignLinks}>Войти</a>
					<a exact to='/registration' activeClassName={styles.activeSignLinks}>Зарегистрироваться</a>
				</div>
			)
		}
	}
	renderAdminControllers () {
		const user = this.context;

		if(user?.role === "admin") {
			return(
				<>
					<a exact to='/users' activeClassName={styles.activeLink}>Список пользователей</a>
				</>
			)
		}

		return null;
	}
	render () {
		return this.renderContent();
	}
}

export default DesktopHeader;

DesktopHeader.contextType = UserContext;
