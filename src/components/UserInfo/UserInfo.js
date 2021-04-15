import React, { Component } from 'react';
import './UserInfo.css';
import Man from '../../img/man.png';

export default class UserInfo extends Component {
    state = {
        name: "Антон",
        role: "Волонтер",
    }
    render() {
        return (
            <div className="user-container">

                <div className="user">
                    <div className="user-fullname">
                        <span className="user-name">{this.state.name}</span>
                        <span className="user-role">{this.state.role}</span>
                    </div>
                    <img src={Man} className="user-icon" alt="profile-icon"></img>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </div>

                <div className="user-controls">
                    <i className="fa fa-bell" aria-hidden="true"></i>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}