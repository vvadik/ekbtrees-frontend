import cn from 'classnames';
import {icon} from 'leaflet';
import React, {useState, useEffect, useRef} from 'react';
import {Circle} from 'react-leaflet';
import markerIcon from './markerIcon';
import {getCircleOptions, getCircleRadius} from "./MapHelpers";
import {TreeForm} from "../MarkerForm/TreeForm";
import {NewTreeMarker} from "../NewTreeMarker/NewTreeMarker";
import {MapState} from "./MapState";
import {useHistory} from "react-router-dom";
import {
	getTreeMapInfoUrl,
	getTreeDataUrl,
	getClusterMapInfoUrl,
	fetchData
} from '../ApiDataLoadHelper/DataLoadHelper';
import MapButton from '../MapButton';
import styles from "./GeojsonLayer.module.css";
import ClusterMarker from '../ClusterMarker/ClusterMarker';
import MarkerClusterGroup from "react-leaflet-markercluster/src/react-leaflet-markercluster";

const DG = require('2gis-maps');

const GeojsonLayer = ({map, mapState, setMapState, user}) => {
	const disableClusteringAtZoom = 19;
	const markerLayer = DG.featureGroup();
	const treesLayer = DG.featureGroup();

	const [activeTreeId, setActiveTreeId] = useState(null);
	const [activeTreeData, setActiveTreeData] = useState(null);
	const [newTreePosition, setNewTreePosition] = useState(null);
	const [mapData, setMapData] = useState(null);
	const markerRef = useRef(null);
	const buttonRef = useRef();
	const history = useHistory();

	const updateMarkerRef = (event) => {
		markerRef.current = event.latlng;
	}

	const loadData = () => {
		// const isCluster = map.getZoom() < disableClusteringAtZoom;
		const containerLatLng = getMapContainerLatLng();
		// const fethUrl = isCluster
		//     ? getClusterMapInfoUrl(containerLatLng)
		//     : getTreeMapInfoUrl(containerLatLng);
		const isCluster = false;

		fetchData(getTreeMapInfoUrl(containerLatLng))
			.then((jsonData) => {
				jsonData.forEach(item => {
					const {latitude, longitude} = item.geographicalPoint;
					DG.marker([latitude, longitude], {icon: markerIcon})
						.addTo(treesLayer)
						.on('click', (e) => handleTreeClick(e, item));
				})
				treesLayer.addTo(map);
				setMapData({isClusterData: isCluster, json: jsonData});
			})
			.catch(err => {
				alert("Возникла ошибка при загрузке деревьев");
				console.error(err);
			});
	};

	const getMapContainerLatLng = () => {
		const mapContainerCoordinates = map.getContainer().getBoundingClientRect()
		const {bottom, right, x, y} = mapContainerCoordinates;
		const upperLeftCorner = map.containerPointToLatLng([y, x]);
		const bottomRightCorner = map.containerPointToLatLng([right, bottom]);
		return [
			{lat: upperLeftCorner.lat + 0.02, lng: upperLeftCorner.lng - 0.02},
			{lat: bottomRightCorner.lat - 0.02, lng: bottomRightCorner.lng + 0.02}
		];
	};

	const handleTreeClick = (e, item) => {
		map.setView([e.latlng.lat, e.latlng.lng]);
		setActiveTreeData(item)
	}

	const handleClick = (event) => {
		if (event.originalEvent.target.tagName === 'BUTTON') {
			return;
		}

		for (const layer in markerLayer._layers) {
			markerLayer._layers[layer].removeFrom(map);
			delete markerLayer._layers[layer];
		}
		markerLayer.removeFrom(map)

		if (mapState === MapState.addTreeBegin) {
			setMapState(MapState.addTreeSelected)
			updateMarkerRef(event)
			DG.marker(markerRef.current, {draggable: true})
				.addTo(markerLayer)
				.on('drag', updateMarkerRef)
			markerLayer.addTo(map)
		}
	}

	const handleClickTreeFormWrapper = () => {
		setActiveTreeId(null);
	}

	const handleClose = () => {
		setActiveTreeData(null)
	}

	const handleZoomEndMoveEnd = () => {
		loadData();
	}

	useEffect(() => {
		map && map.on('click', handleClick);
		map && map.on('zoomend', handleZoomEndMoveEnd);
		map && map.on('moveend', handleZoomEndMoveEnd);
	}, [mapState])

	useEffect(() => {
		map && !mapData && loadData();
	}, [map, mapData])

	useEffect(() => {
		setActiveTreeData(null);
		activeTreeId &&
		fetchData(getTreeDataUrl(activeTreeId))
			.then((jsonData) => {
				setActiveTreeData(jsonData);
			})
			.catch(err => {
				alert("Возникла ошибка при загрузке информации о дереве");
				console.error(err);
			})
	}, [activeTreeId]);

	useEffect(() => {
		if (mapState === MapState.addTreeSubmit) {
			const {lat, lng} = markerRef.current;
			history.push(`/addtree/${lat}/${lng}`);
		}
	})

	const stylesCN = cn({
		[styles.treeFormContainer]: true
	});

	const renderButton = () => user &&
		<MapButton ref={buttonRef} mapState={mapState} setMapState={setMapState}/>;

	return (
		<>
			{/*{ mapData && getMarkerClusterGroup(mapState, mapData, setActiveTreeId, map)}*/}
			{/*{ newTreePosition && <NewTreeMarker position={newTreePosition} setPosition={setNewTreePosition}/>}*/}
			<div className={stylesCN} onClick={handleClickTreeFormWrapper}>
				{activeTreeData && <TreeForm activeTree={activeTreeData} onClose={handleClose}/>}
			</div>
			{renderButton()}
		</>
	);
}

function getMarkerClusterGroup(state, data, setActiveTree, map) {
	/* FixMe - Этот кусок кода игнорируется, т.к isClusterData зашит на false.
			Как я понял, MarkerClusterGroup должен принимать столько точек, сколько реально должно отрисоваться.
			Т.е. если нам пришло 8 точек, то в MarkerClusterGroup должно быть 8 объектов, тогда кластеризация происходит корректно.
			На данный момент в MarkerClusterGroup приходит 1 объект, в котором число доступных деревьев равно 8.
			На экране отрисовывается точка с числом 8, а после слияния с другой точкой отображается число 2, т.к. отрисовано всего 2 объекта.
	*/
	if (data.isClusterData) {
		return (
			<MarkerClusterGroup disableClusteringAtZoom={19}>
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
	} else {
		const isCluster = map.getZoom() < 19;
		console.log(map.getZoom(), 'zoom');
		return (
			<MarkerClusterGroup disableClusteringAtZoom={19}>
				{data.json
					.map((f, idx) => (
						<Circle
							eventHandlers={{click: () => state === MapState.default && setActiveTree(f.id)}}
							key={idx}
							center={[f.geographicalPoint.latitude, f.geographicalPoint.longitude]}
							pathOptions={getCircleOptions(f.species.title)}
							radius={getCircleRadius(f.diameterOfCrown ?? 10)}
							weight={1}
							title={1}>
						</Circle>
					))}
			</MarkerClusterGroup>
		);
	}
}

export default GeojsonLayer;
