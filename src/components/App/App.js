import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

import Header from '../Header';
import Main from '../Main';
//import './App.css';

const cookies = new Cookies();
export default class App extends Component {
    state = {
        user: null,
    }

    componentDidMount(){
        cookies.addChangeListener(this.onCookieChange);
        this.handleState();
    }

    handleCookie = () => {
        this.handleState();
    }
    onCookieChange = () => {
        console.log("Noticed cookie change!");
        this.handleState();
    }
    removeCookie = () => {
        console.log(cookies)
        cookies.remove('AccessToken');
        this.setState({
            user: null
        })
    }
    handleState() {
        const cookieAccess = cookies.get('AccessToken');
        if(cookieAccess){
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
        return (
        <div className="page">
            <Header onCookieRemove={this.removeCookie} user={this.state.user}/>
            <Main onCookie={this.handleCookie} user={this.state.user}/>
            </div>
        )
    }
}

