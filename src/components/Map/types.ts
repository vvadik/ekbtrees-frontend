import {IJsonTree, IUser} from "../../common/types";


export interface ILatLng {
    lat: number;
    lng: number;
}

export interface IMapData {
    isClusterData: boolean;
    json: IJsonTree[];
}

export interface ICircleOptions {
    fillColor: string;
    color: string;
}

export interface IGeojsonLayerProps {
    user: IUser | null;
    map: any; // 2-gis map
    mapState: number;
    setMapState: any; // 2-gis map setter
}

export interface IGeojsonLayerState { }

export interface IMapContainProps {
    user: IUser | null;
    className?: string;
    styleName?: string;
}

export interface IMapContainState { }
