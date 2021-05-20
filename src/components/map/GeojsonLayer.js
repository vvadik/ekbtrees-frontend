import React, { useState, useEffect } from 'react';
import { Circle, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { getCircleOptions, getCircleRadius, fetchData } from "./MapHelpers";
import { FormPopup } from "../MarkerForm/MarkerForm";
import { NewTreeMarker } from "../NewTreeMarker/NewTreeMarker";
import { MapSate } from "./MapState";

const GeojsonLayer = ({mapState, setMapState, url}) => {
    const [activeTree, setActiveTree] = useState(null);
    const [newTreePosition, setNewTreePosition] = useState(null);
    const [data, setData] = useState([]);

    useMapEvents({
        click: (e) => {
            mapState === MapSate.addTreeBegin && (setMapState(MapSate.addTreeSelected) || setNewTreePosition(e.latlng));
            console.log("Click position: " + JSON.stringify(newTreePosition, null, 2))
        }
    });

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((jsonData) => {
                setData(jsonData);
              })
    }, [url]);

    return (
        <>
        {getMarkerClusterGroup(mapState, data, setActiveTree)}
        { newTreePosition && <NewTreeMarker position={newTreePosition}/>}
        <FormPopup activeTree = {activeTree} setActiveTree = {setActiveTree}/>
        </>
    );
}

function getMarkerClusterGroup(state, data, setActiveTree) {
    return (
        <MarkerClusterGroup disableClusteringAtZoom = {19}>
            {data
                //.filter(feaure => feaure.geometry.type === "Point" && feaure.properties.ekbtree)
                .map((f, idx) => (
                    <Circle
                        eventHandlers={{ click: () => state === MapSate.default && setActiveTree(f) }}
                        key={idx}
                        center={[f.geographicalPoint.latitude, f.geographicalPoint.longitude]}
                        pathOptions={getCircleOptions(f.type)}
                        radius={getCircleRadius(f.diameterOfCrown ?? 0)}
                        weight={1}
                    >
                    </Circle>
            ))}
        </MarkerClusterGroup>
    );
}

export default GeojsonLayer;