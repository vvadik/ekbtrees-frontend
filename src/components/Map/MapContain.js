import { MapContainer, TileLayer } from "react-leaflet";
import GeojsonLayer from "./GeojsonLayer";
import "./Map.css";
import React from "react";

const MapContain = ({ url }) => {
  const defaultPosition = [56.8391040, 60.6082500]; // Yekaterinburg position

  return (
    <React.Fragment>
      <div className="map-container">
        <MapContainer center={defaultPosition} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            id='mapbox/streets-v11'
            accessToken='pk.eyJ1IjoieWVodXV1IiwiYSI6ImNrbXJ3YnU0YTA3dmcyb25zM2hqaGgzZmMifQ.YH_abJ3UPrBUTNebAKIiZg'
            tileSize={512}
            zoomOffset={-1}
            maxZoom={21}
          />
          <GeojsonLayer url={url} />
        </MapContainer>
      </div>
    </React.Fragment>
  );
};

export default MapContain;