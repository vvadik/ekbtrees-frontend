import React, { useState, useEffect} from 'react';
import {Circle} from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import {getCircleOptions, getCircleRadius, fetchData} from "./MapHelpers";
import {FormPopup} from "../MarkerForm/MarkerForm";

const GeojsonLayer = ({url}) => {
    const [activeTree, setActiveTree] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(url)
            .then(data => setData(data));
    }, [url]);

    return (
        <>
        {getMarkerClusterGroup(data, setActiveTree)}
        <FormPopup activeTree = {activeTree} setActiveTree = {setActiveTree}/>
        </>
    );
}

function getMarkerClusterGroup(data, setActiveTree) {
    return (
        <MarkerClusterGroup disableClusteringAtZoom = {19}>
            {data
                .filter(feaure => feaure.geometry.type === "Point" && feaure.properties.denotation === "garden")
                .map((f, idx) => (
                    <Circle
                        eventHandlers={{ click: () => setActiveTree(f) }}
                        key={idx}
                        center={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
                        pathOptions={getCircleOptions(f.properties["genus:ru"])}
                        radius={getCircleRadius(f.properties.height ?? 0)}
                        weight={1}
                    >
                    </Circle>
            ))}
        </MarkerClusterGroup>
    );
}

export default GeojsonLayer;