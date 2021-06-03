import React, { useState, useEffect } from 'react';
import { Circle, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { getCircleOptions, getCircleRadius } from "./MapHelpers";
import { TreeForm } from "../MarkerForm/TreeForm";
import { NewTreeMarker } from "../NewTreeMarker/NewTreeMarker";
import { MapSate } from "./MapState";
import { useHistory } from "react-router-dom";
import { getTreeMapInfoUrl, getTreeDataUrl, fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import MapButton from '../MapButton';
import "./GeojsonLayer.css";

const GeojsonLayer = ({mapState, setMapState}) => {
    const [activeTreeId, setActiveTreeId] = useState(null);
    const [activeTreeData, setActiveTreeData] = useState(null);
    const [newTreePosition, setNewTreePosition] = useState(null);
    const [mapData, setMapData] = useState([]);
    const history = useHistory();
    const treeMapInfoUrl = getTreeMapInfoUrl({latTop: 56, lngTop: 60, latBottom: 57, lngBottom: 61});

    useMapEvents({
        click: (e) => {
            mapState === MapSate.addTreeBegin && 
                         (setMapState(MapSate.addTreeSelected) || setNewTreePosition(e.latlng));
        }
    });

    useEffect(() => {
        fetchData(treeMapInfoUrl)
            .then((jsonData) => {
                setMapData(jsonData);
              })
            .catch(err => {
                alert("Возникла ошибка при загрузке деревьев");
                console.log(err);
            })
    }, [treeMapInfoUrl]);

    useEffect(() => {
        activeTreeId && 
        fetchData(getTreeDataUrl(activeTreeId))
            .then((jsonData) => {
                setActiveTreeData(jsonData);
            })
            .catch(err => {
                alert("Возникла ошибка при загрузке информации о дереве");
                console.log(err);
            })
    });

    useEffect(() => {
        if (mapState == MapSate.addTreeSubmit) {
            history.push(`/addtree/${newTreePosition.lat}/${newTreePosition.lng}`);
        }
    })

    return (
        <>
        {getMarkerClusterGroup(mapState, mapData, setActiveTreeId)}
        { newTreePosition && <NewTreeMarker position={newTreePosition} setPosition={setNewTreePosition}/>}
        <div className= {activeTreeId ? "tree-form-container active" : "tree-form-container"} onClick={() => setActiveTreeId(null)}>
            <TreeForm activeTree = {activeTreeData}/>
        </div>
        <MapButton mapState={ mapState } setMapState={ setMapState } />
        </>
    );
}

function getMarkerClusterGroup(state, data, setActiveTree) {
    return (
        <MarkerClusterGroup disableClusteringAtZoom = {19}>
            {data
                .map((f, idx) => (
                    <Circle
                        eventHandlers={{ click: () => state === MapSate.default && setActiveTree(f.id) }}
                        key={idx}
                        center={[f.geographicalPoint.latitude, f.geographicalPoint.longitude]}
                        pathOptions={getCircleOptions(f.species.title)}
                        radius={getCircleRadius(f.diameterOfCrown ?? 0)}
                        weight={1}
                    >
                    </Circle>
            ))}
        </MarkerClusterGroup>
    );
}

export default GeojsonLayer;