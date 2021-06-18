import React, {Component} from "react";
import Progress from '@material-ui/core/LinearProgress';
import styles from './LinearProgress.module.css';

export class LinearProgress extends Component {
	render () {
		return (
			<div className={styles.wrapper}>
				<Progress />
			</div>
		)
	}
}

export default LinearProgress;
