import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import UITextField from '@material-ui/core/TextField';
import {ITextFieldProps} from "./types";


const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		'& .MuiFormControl-root': {
			width: '100%',
		},
	},
}));

export const TextField = (props: ITextFieldProps) => {
	const {id, item, onChange} = props;
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<UITextField
				disabled={item.disabled ?? false}
				type={item.type}
				onChange={onChange}
				variant="filled"
				id={id}
				label={item.title}
				value={item.value}
			/>
		</div>
	)
}

export default TextField;
