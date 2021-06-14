import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import GeojsonLayer from "./GeojsonLayer";
import { MapSate } from "./MapState";
import "./Map.css";
import {TreeForm} from "../MarkerForm/TreeForm";

const MapContain = (props) => {
  const defaultPosition = [56.8391040, 60.6082500]; // Yekaterinburg position
  const [mapState , setMapState] = useState(MapSate.default);
  const { styleName, user } = props;
  return (
    <React.Fragment>
      <MapContainer className={styleName} center={defaultPosition} zoom={15} scrollWheelZoom={true}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        id='mapbox/streets-v11'
        accessToken='pk.eyJ1IjoieWVodXV1IiwiYSI6ImNrbXJ3YnU0YTA3dmcyb25zM2hqaGgzZmMifQ.YH_abJ3UPrBUTNebAKIiZg'
        tileSize={512}
        zoomOffset={-1}
        maxZoom={21}
      />
      <GeojsonLayer mapState={ mapState } setMapState={ setMapState } user={user} />
    </MapContainer>
        {/*<div>*/}
        {/*    <TreeForm activeTree = {null}/>*/}
        {/*</div>*/}
    </React.Fragment>
  );
};

export default MapContain;
