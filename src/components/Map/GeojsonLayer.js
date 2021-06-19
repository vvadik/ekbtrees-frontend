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
import MarkerClusterGroup from "react-leaflet-markercluster/src/react-leaflet-markercluster";

const GeojsonLayer = ({mapState, setMapState, user}) => {
    const map = useMap();
    const disableClusteringAtZoom = 19;

    const [activeTreeId, setActiveTreeId] = useState(null);
    const [activeTreeData, setActiveTreeData] = useState(null);
    const [newTreePosition, setNewTreePosition] = useState(null);
    const [mapData, setMapData] = useState(null);
    const history = useHistory();

    const loadData = () => {
        // const isCluster = map.getZoom() < disableClusteringAtZoom;
        const containerLatLng = getMapContainerLatLng();
        // const fethUrl = isCluster
        //     ? getClusterMapInfoUrl(containerLatLng)
        //     : getTreeMapInfoUrl(containerLatLng);
        const isCluster = false;

        fetchData(getTreeMapInfoUrl(containerLatLng))
            .then((jsonData) => {
                setMapData({isClusterData: isCluster, json: jsonData});
              })
            .catch(err => {
                alert("Возникла ошибка при загрузке деревьев");
                console.log(err);
            });
    };

    const getMapContainerLatLng = () => {
        const mapContainerCoordinats = map.getContainer().getBoundingClientRect()
        const upperLeftCorner = map.containerPointToLatLng([mapContainerCoordinats.y, mapContainerCoordinats.x]);
        const bottomRightCorner = map.containerPointToLatLng([mapContainerCoordinats.right, mapContainerCoordinats.bottom]);
        return [
            {lat: upperLeftCorner.lat + 0.02, lng: upperLeftCorner.lng - 0.02},
            {lat: bottomRightCorner.lat - 0.02, lng: bottomRightCorner.lng + 0.02}];
    };

    useMapEvents({
        click: (e) => {
            mapState === MapSate.addTreeBegin &&
                         (setMapState(MapSate.addTreeSelected) || setNewTreePosition(e.latlng));
        },
        zoomend: () => {
            loadData();
        },
        moveend: () => {
            loadData();
        },
    });

    useEffect(() => {
        !mapData && loadData();
    }, [mapData])

    useEffect(() => {
        setActiveTreeData(null);
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
        [styles.treeFormContainer]: true
    });

    const renderButton = () => {
        return user ?
            <MapButton mapState={ mapState } setMapState={ setMapState } />
            : null;
    }

    const handleClickTreeFormWrapper = () => {
        setActiveTreeId(null);
    }

    const handleClose = () => {
        setActiveTreeData(null)
    }

    return (
        <>
        { mapData && getMarkerClusterGroup(mapState, mapData, setActiveTreeId)}
        { newTreePosition && <NewTreeMarker position={newTreePosition} setPosition={setNewTreePosition}/>}
        <div className={stylesCN} onClick={handleClickTreeFormWrapper}>
            {activeTreeData ? <TreeForm activeTree = {activeTreeData} onClose={handleClose} /> : null}
        </div>
            {renderButton()}
        </>
    );
}

function getMarkerClusterGroup(state, data, setActiveTree) {
    /* FixMe - Этот кусок кода игнорируется, т.к isClusterData зашит на false.
        Как я понял, MarkerClusterGroup должен принимать столько точек, сколько реально должно отрисоваться.
        Т.е. если нам пришло 8 точек, то в MarkerClusterGroup должно быть 8 объектов, тогда кластеризация происходит корректно.
        На данный момент в MarkerClusterGroup приходит 1 объект, в котором число доступных деревьев равно 8.
        На экране отрисовывается точка с числом 8, а после слияния с другой точкой отображается число 2, т.к. отрисовано всего 2 объекта.
    */
    if (data.isClusterData) {
        return (
            <MarkerClusterGroup disableClusteringAtZoom = {19}>
            {data.json
                .map((f, idx) => (
                    <ClusterMarker
                        key={idx}
                        count={f.count}
                        position={[f.centre.latitude, f.centre.longitude]}
                        weight={1}>
                    </ClusterMarker>
            ))}
            </MarkerClusterGroup>);
    }
    else {
        return (
            <MarkerClusterGroup disableClusteringAtZoom = {19}>
            {data.json
                .map((f, idx) => (
                    <Circle
                        eventHandlers={{ click: () => state === MapSate.default && setActiveTree(f.id) }}
                        key={idx}
                        center={[f.geographicalPoint.latitude, f.geographicalPoint.longitude]}
                        pathOptions={getCircleOptions(f.species.title)}
                        radius={getCircleRadius(f.diameterOfCrown ?? 10)}
                        weight={1}
                        title ={1}>
                    </Circle>
            ))}
            </MarkerClusterGroup>
        );
    }
}

export default GeojsonLayer;
