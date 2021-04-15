import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MapButton.css';
export default class MapButton extends Component {
    render() {
        return (
            <NavLink className="log-in-map" exact to={this.props.link} activeclassname="active">
                <i className="fa fa-sign-in" aria-hidden="true"></i>
                {this.props.name}
            </NavLink>
        )
    }
}