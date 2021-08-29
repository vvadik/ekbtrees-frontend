import Header from "../Header";
import {UserContext} from "../../context/contexts";

import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import React, {Component} from "react";

const cookies = new Cookies();

class PageLayout extends Component {
	constructor (props) {
		super(props);

		this.state = {
			user: null
		}
	}

	changeCookie = () => {
		const cookieAccess = cookies.get('AccessToken');

		if(cookieAccess) {
			const decodedCookie = jwt_decode(cookieAccess);
			const {id, email, firstName, lastName, roles} = decodedCookie;

			this.setState({
				user: {
					id,
					email,
					firstName,
					lastName,
					role: roles[0]
				}
			})
		}
	}

	removeCookie = () => {
		cookies.remove('AccessToken');

		this.setState({
			user: null
		})
	}



	render () {
		return (
			<UserContext.Provider value={this.state.user}>
				<Header onCookieRemove={this.removeCookie} />
				{this.props.children}
			</UserContext.Provider>
		)
	}
}

export default PageLayout;
