import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

import Header from '../Header';
import Main from '../Main';
import './App.css';

const cookies = new Cookies();
export default class App extends Component {
    state = {
        role: null,
        firstName: null,
        lastName: null,
        cookieSet: false
    }
    componentDidMount(){
        this.handleState();
    }
    handleCookie = () => {       
        cookies.addChangeListener(this.onCookieChange);              
        // cookies.set(
        //     'AccessToken', 
        //     'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJFS0JUcmVlcyBBdXRoIFNlcnZpY2UiLCJpYXQiOjE2MjMwNjYwOTMsImV4cCI6MTYyMzA2Nzg5MywiaWQiOjUsImZpcnN0TmFtZSI6IkFuemhlbGluYSIsImxhc3ROYW1lIjoiR2FmdXJvdmEiLCJyb2xlcyI6WyJ2b2x1bnRlZXIiXX0.n5Syvs0Wbv2EZYGXxMGV_MVhGjGy_cBUNaS8_YwsJEwyBt1N8MVBq-F7BMyFg_DzI5aQ1IufvoMcN4BfMz4oxA', 
        //     { path: '/' }
        //     );           
        this.handleState();               
    }
    removeCookie = () => {
        console.log(cookies)
        cookies.remove('AccessToken');
        this.setState({
            cookieSet: false
        }) 
    }
    handleState() {
        const cookieAccess = cookies.get('AccessToken');       
        if(cookieAccess){
            const decodedCookie = jwt_decode(cookieAccess);
            this.setState({
                cookieSet: true,
                role: decodedCookie.roles[0],
                firstName: decodedCookie.firstName,
                lastName: decodedCookie.lastName
            })  
        }        
    }
    onCookieChange() {
        console.log("Noticed cookie change!")
    }
    render() {
        return (
        <div className="page">
            <Header onCookieRemove={this.removeCookie} info={this.state}/>
            <Main onCookie={this.handleCookie} info={this.state}/>
            </div>
        )
    }
}

