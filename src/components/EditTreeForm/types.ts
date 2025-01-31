import React from "react";
import * as H from "history";
import {IEditedTree, IFile, IUser} from "../../common/types";


export interface IEditTreeFormProps {
    user: IUser | null;
    onCookieRemove?: React.MouseEventHandler<HTMLElement>;
    history: H.History;
}

export interface IEditTreeFormState {
    tree: IEditedTree | null;
    loading: boolean;
    files: IFile[];
    loadingFiles: boolean;
    uploadingFiles: boolean;
    images: IFile[];
    uploadingImages: boolean;
    [key: string]: any;
}
