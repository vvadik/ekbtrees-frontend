import {ChangeEventHandler} from "react";
import {ITreeProperty} from "../../common/types";


export interface ITextFieldProps {
    id: string;
    item: ITreeProperty;
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export interface ITextFieldState { }
