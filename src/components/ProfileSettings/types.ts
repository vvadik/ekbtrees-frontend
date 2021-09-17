import {IUser} from "../../common/types";


export interface IProfileSettingsProps {
    user: IUser | null;
}

export interface IProfileSettingsState {
    requiredFields: (keyof IUser)[];
}
