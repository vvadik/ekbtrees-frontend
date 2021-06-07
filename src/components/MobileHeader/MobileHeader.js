import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Menu from '../Menu';

export class MobileHeader extends Component {
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
			? <div className="menuWrapper" ref={this.handleRef}>
				<Menu onClick={this.handleClick} />
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

	renderLogo(){
		return (
			<NavLink exact to='/' activeclassname="active-logo" className="ekb-trees"><span className="big-header-mobile">Ekb</span><span className="small-header-mobile">Trees</span></NavLink>
		)
	}

	renderContent () {
		return (
			<div className="mobile-header">
				<div className="topnav">
					{this.renderLogo()}
					<button className="burger-btn" onClick={this.handleClick}>
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
