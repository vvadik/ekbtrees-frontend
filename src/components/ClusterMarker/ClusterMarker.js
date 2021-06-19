import { Component } from "react";
import { divIcon } from "leaflet";
import { Marker } from "react-leaflet";
import styles from "./ClusterMarker.css";

export default class ClusterMarker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const markerIcon = divIcon({
            html: '<div><span>' + this.props.count + '</span></div>',
            className: "circle-div-icon",
            iconSize: [40, 40]
        });

        return (<Marker
            position={this.props.position}
            icon={ markerIcon }
        />);
    }
}
