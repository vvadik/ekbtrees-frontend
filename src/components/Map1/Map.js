import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeojsonLayer from "./GeojsonLayer";
import { AddTreeButton } from "./../AddTreeButton/AddTreeButton";
import { MapSate } from "./MapState";

const Map = ({url}) => {
    const defaultPosition = { lat: 56.8391040, lng: 60.6082500 }; // Yekaterinburg position
    const [mapState , setMapState] = useState(MapSate.default);

    return (
        <div className="map-container">
            <MapContainer center={defaultPosition} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                    id='mapbox/streets-v11'
                    accessToken='pk.eyJ1IjoieWVodXV1IiwiYSI6ImNrbXJ3YnU0YTA3dmcyb25zM2hqaGgzZmMifQ.YH_abJ3UPrBUTNebAKIiZg'
                    tileSize={512}
                    zoomOffset={-1}
                    maxZoom={22}
                />
                <GeojsonLayer mapState={ mapState } setMapState={ setMapState } url={ url }/>
            </MapContainer>
            <AddTreeButton mapState={ mapState } setMapState={ setMapState }/>
        </div>
    )
};

export default Map;