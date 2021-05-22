import React, { Component } from "react";
import MapContain from './MapContain';
import MapButton from '../MapButton';
import './Map.css';
export default class Map extends Component {
    render() {
        return (
            <div className="map">
                <MapContain url="Park.geojson" />
                <MapButton name="Добавить" link="/" />
            </div>
        )
    }
}