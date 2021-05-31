import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MapButton.css';
export default class MapButton extends Component {
    render() {
        return (
            <NavLink className="log-in-map" exact to={this.props.link}>
                <i className="fa fa-sign-in" aria-hidden="true" />
                {this.props.name}
            </NavLink>
        )
    }
}
