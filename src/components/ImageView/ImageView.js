import React, { Component } from 'react';
import { fetchData } from '../ApiDataLoadHelper/DataLoadHelper';
import styles from "./ImageView.module.css";

export default class ImageView extends Component {
    constructor(props) {
        super(props);

        this.state = {imageData: null};
    }

    componentDidMount() {
        fetchData(`https://ekb-trees-help.ru/api/file/${this.props.match.params.id}`)
            .then((jsonData) => {
                this.setState({imageData: jsonData});
            });
    }

    render() {
        return (
            <div className={styles.viewImagePageContainer}>
                <img src={this.state.imageData?.uri}/>
            </div>
        )
    }
}