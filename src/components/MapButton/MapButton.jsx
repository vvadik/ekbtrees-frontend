import React, { Component } from 'react';
import { MapSate } from "../Map/MapState";
import styles from './MapButton.less';

export default class MapButton extends Component {
    render() {
        return (
            <button disabled={this.props.mapState === MapSate.addTreeBegin}
            className={styles.mapButton}
            onClick={ () => buttonOnClickHandler(this.props.mapState, this.props.setMapState) }>
                {getButtonText(this.props.mapState)}</button>
        )
    }
}

const buttonOnClickHandler = (mapSate, setMapState) => {
    if (mapSate === MapSate.default) {
        setMapState(MapSate.addTreeBegin);
    }
    if (mapSate === MapSate.addTreeSelected) {
        setMapState(MapSate.addTreeSubmit);
    }
}

const getButtonText = (mapSate) => {
    if (mapSate === MapSate.default) {
        return "Добавить дерево";
    }
    if (mapSate === MapSate.addTreeBegin) {
        return "Укажите точку на карте";
    }
    if (mapSate === MapSate.addTreeSelected || mapSate === MapSate.addTreeSubmit) {
        return "Добавить";
    }
}
