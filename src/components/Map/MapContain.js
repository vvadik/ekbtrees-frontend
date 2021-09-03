import React, {useEffect, useRef} from "react";
import {useState} from "react";
import GeojsonLayer from "./GeojsonLayer";
import {MapState} from "./MapState";
import "./Map.css";

const DG = require('2gis-maps');

const MapContain = (props) => {
	const {styleName, user} = props;

	const defaultPosition = [56.8391040, 60.6082500]; // Yekaterinburg position
	const [map, setMap] = useState();
	const [mapState, setMapState] = useState(MapState.default);
	const elRef = useRef();

	useEffect(() => {
		let innerMap = map;
		if (!innerMap) {
			innerMap = DG.map(elRef.current, {
				'center': defaultPosition,
				'zoom': 14
			});
			setMap(innerMap)
		} else {
			innerMap.setView(defaultPosition)
		}
	}, [])

	return (
		<div ref={elRef} className={props.className}>
			<GeojsonLayer
				map={map}
				mapState={mapState}
				setMapState={setMapState}
				user={user} />
		</div>
	);
};

export default MapContain;
