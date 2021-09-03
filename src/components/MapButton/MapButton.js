import React from 'react';
import {MapState} from "../Map/MapState";
import styles from './MapButton.module.css';

const MapButton = ({mapState, setMapState}) => {
	const handleClick = () => {
		if (mapState === MapState.default) {
			setMapState(MapState.addTreeBegin);
		}
		if (mapState === MapState.addTreeSelected) {
			setMapState(MapState.addTreeSubmit);
		}
	}

	const renderTitle = () => {
		if (mapState === MapState.default) {
			return "Добавить дерево";
		}
		if (mapState === MapState.addTreeBegin) {
			return "Укажите точку на карте";
		}
		if (mapState === MapState.addTreeSelected || mapState === MapState.addTreeSubmit) {
			return "Добавить";
		}
	}

	return (
		<button
			disabled={mapState === MapState.addTreeBegin}
			className={styles.mapButton}
			onClick={handleClick}>
			{renderTitle(mapState)}
		</button>
	)
}

export default MapButton;