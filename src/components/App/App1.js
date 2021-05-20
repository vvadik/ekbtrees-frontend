import React, { Component } from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import './app.css';

export default class App extends Component {
    componentDidMount() {
        if (document.querySelector(".page").clientHeight < document.documentElement.clientHeight) {
            document.querySelector(".page").style.height = document.documentElement.clientHeight + "px";
        }
    }
    render() {
        return ( <div className = "page" >
            <Header />
            <Main />
            <Footer />
            </div>
        )
    }
}