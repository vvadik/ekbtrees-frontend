import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import UISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from "../Spinner/Spinner";
import {ISelectProps, ISelectOption} from "./types";


const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

export const Select = (props: ISelectProps) => {
    const {id, item, onChange, onOpen} = props;
    const styles = useStyles();

    const renderOptions = (values: ISelectOption[]) => {
        if (item.loading) {
            return <MenuItem disabled>
                <Spinner/>
            </MenuItem>;
        }

        const menuItems = values.map(value => {
            return (
                <MenuItem value={value.id} key={value.id}>
                    {value.title}
                </MenuItem>
            );
        });
        return menuItems;
    }

    return (
        <div className={styles.root}>
            <FormControl variant="filled">
                <InputLabel htmlFor={id}>{item.title}</InputLabel>
                <UISelect
                    onOpen={onOpen}
                    native={false}
                    onChange={onChange}
                    inputProps={{
                        name: item.title,
                        id,
                    }}
                    value={item.value}
                >
                    {renderOptions(item.values ?? [])}
                </UISelect>
            </FormControl>
        </div>
    )
}

export default Select;
