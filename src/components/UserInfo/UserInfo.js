import React, { Component } from 'react';
import './UserInfo.css';
import Man from '../../img/man.png';
import UserMenu from '../UserMenu';

export default class UserInfo extends Component {
    state = {
        name: "Антон",
        role: "Волонтер",
    }

    handleClick() {
        const userNavBar = document.getElementById("userNavBar");
        const icon = document.querySelector(".fa-chevron-down");

        userNavBar.hidden = !userNavBar.hidden;
        userNavBar.hidden ? icon.style.color = "lightgrey" : icon.style.color = "#54ABFDFF";

    }

    render() {
        return (
            <div className="container">
                <div className="user-container">
                    <div className="user">
                        <div className="user-fullname">
                            <span className="user-name">{this.state.name}</span>
                            <span className="user-role">{this.state.role}</span>
                        </div>
                        <img src={Man} className="user-icon" alt="profile-icon"></img>
                        <button className="user-btn" onClick={this.handleClick}>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="user-controls">
                        <i className="fa fa-bell" aria-hidden="true"></i>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                </div>
                <UserMenu />
            </div>
        )
    }
}