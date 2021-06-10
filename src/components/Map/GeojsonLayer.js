import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import { Circle, useMap, useMapEvents } from 'react-leaflet';
import { getCircleOptions, getCircleRadius } from "./MapHelpers";
import { TreeForm } from "../MarkerForm/TreeForm";
import { NewTreeMarker } from "../NewTreeMarker/NewTreeMarker";
import { MapSate } from "./MapState";
import { useHistory } from "react-router-dom";
import { getTreeMapInfoUrl, getTreeDataUrl, getClusterMapInfoUrl, fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import MapButton from '../MapButton';
import styles from "./GeojsonLayer.module.css";
import ClusterMarker from '../ClusterMarker/ClusterMarker';

const GeojsonLayer = ({mapState, setMapState}) => {
    const map = useMap();
    const disableClusteringAtZoom = 19; 

    const treeMapInfoUrl = getTreeMapInfoUrl({latTop: 56, lngTop: 60, latBottom: 57, lngBottom: 61});
    const clusterMapInfoUrl = getClusterMapInfoUrl({latTop: 56, lngTop: 60, latBottom: 57, lngBottom: 61});
    const [activeTreeId, setActiveTreeId] = useState(null);
    const [activeTreeData, setActiveTreeData] = useState(null);
    const [newTreePosition, setNewTreePosition] = useState(null);
    const [mapData, setMapData] = useState(null);
    const history = useHistory();

    const loadData = () => {
        const isCluster = map.getZoom() < disableClusteringAtZoom;
        const fethUrl = isCluster ? clusterMapInfoUrl : treeMapInfoUrl;
        fetchData(fethUrl)
            .then((jsonData) => {
                setMapData({isClusterData: isCluster, json: jsonData});
              })
            .catch(err => {
                alert("Возникла ошибка при загрузке деревьев");
                console.log(err);
            });
    };

    useMapEvents({
        click: (e) => {
            mapState === MapSate.addTreeBegin &&
                         (setMapState(MapSate.addTreeSelected) || setNewTreePosition(e.latlng));
        },
        zoomend: () => {
            loadData();
        }
    });

    useEffect(() => {
        !mapData && loadData();
    }, [mapData])

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
    }, [activeTreeId]);

    useEffect(() => {
        if (mapState == MapSate.addTreeSubmit) {
            history.push(`/addtree/${newTreePosition.lat}/${newTreePosition.lng}`);
        }
    })

    const stylesCN = cn({
        [styles.treeFormContainer]: true,
        [styles.active]: activeTreeId
    });

    return (
        <>
        { mapData && getMarkerClusterGroup(mapState, mapData, setActiveTreeId)}
        { newTreePosition && <NewTreeMarker position={newTreePosition} setPosition={setNewTreePosition}/>}
        <div className={stylesCN} onClick={() => setActiveTreeId(null)}>
            <TreeForm activeTree = {activeTreeData}/>
        </div>
        <MapButton mapState={ mapState } setMapState={ setMapState } />
        </>
    );
}

function getMarkerClusterGroup(state, data, setActiveTree) {
    if (data.isClusterData) {
        return (
            <>
            {data.json
                .map((f, idx) => (
                    <ClusterMarker
                        key={idx}
                        count={f.count}
                        position={[f.centre.latitude, f.centre.longitude]}
                        weight={1}>
                    </ClusterMarker>
            ))}
            </>);
    }
    else {
        return (
            <>
            {data.json
                .map((f, idx) => (
                    <Circle
                        eventHandlers={{ click: () => state === MapSate.default && setActiveTree(f.id) }}
                        key={idx}
                        center={[f.geographicalPoint.latitude, f.geographicalPoint.longitude]}
                        pathOptions={getCircleOptions(f.species.title)}
                        radius={getCircleRadius(f.diameterOfCrown ?? 0)}
                        weight={1}
                        title ={1}>
                    </Circle>
            ))}
            </>
        );
    }  
}

export default GeojsonLayer;
