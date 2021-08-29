import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Menu from '../Menu';
import styles from './MobileHeader.module.css';
import {Logo} from "../Logo/Logo";

export class MobileHeader extends Component {
	static defaultProps = {
		user: null
	}

	ref = null;

	state = {
		open: false
	};

	componentDidMount() {
		window.addEventListener('mousedown', this.handleMouseDown)
	}

	componentWillUnmount() {
		window.removeEventListener('mousedown', this.handleMouseDown);
	}

	handleClick = () => this.setState({open: !this.state.open});

	renderMenu () {
		const {open} = this.state;
		return open
			? <div ref={this.handleRef}>
				<Menu onClick={this.handleClick} user={this.props.user} />
			</div>
			: null;
	}

	handleMouseDown = (event) => {
		const {ref} = this;

		if (ref) {
			const rect = ref.getBoundingClientRect();

			if (event.clientY > rect.bottom) {
				this.setState({open: false})
			}
		}
	}

	handleRef = (ref) => {
		this.ref = ref;
	}

	renderContent () {
		return (
			<div className={styles.mobileHeader}>
				<div className={styles.topNav}>
					<Logo className={styles.logo}/>
					<button className={styles.burgerBtn} onClick={this.handleClick}>
						<i className="fa fa-bars" />
					</button>
				</div>
				{this.renderMenu()}
			</div>
		)
	}

	render () {
		return this.renderContent();
	}
}

export default MobileHeader;
