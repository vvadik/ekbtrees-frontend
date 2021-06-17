import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import Main from "../Main";
import Header from "../Header";

const cookies = new Cookies();

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount(){
        cookies.addChangeListener(this.handleCookie);
        this.handleCookie();
    }


    removeCookie = () => {
        cookies.remove('AccessToken');

        this.setState({
            user: null
        })
    }

    handleCookie = () => {
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

    render() {
        const {user} = this.state;

        return (
            <>
                <Header user={user} onCookieRemove={this.removeCookie} />
                <Main user={user} onCookie={this.handleCookie} />
            </>
        )
    }
}

