import React from "react";
import styles from "./Spinner.less";
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
	return (
		<div className={styles.spinner}>
			<CircularProgress color="primary" size={70} />
		</div>
	)
}

export default Spinner;
