import {IFile, ITreeModelConverted, IUser} from "../../common/types";


export interface ITreeProps {
    user: IUser | null;
}

export interface ITreeState {
    tree: ITreeModelConverted | null;
    loading: boolean;
    files: IFile[];
    images: IFile[];
    loadingFiles: boolean;
}
