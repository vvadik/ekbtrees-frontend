export const fetchData = (url, options) => {
    return fetch(url, options)
        .then(r => r.json());
}

export const baseUrl = "https://ekb-trees-help.ru/api/";

export const getTreeMapInfoUrl = (areaPosition) => 
    baseUrl + `tree-map-info/get-in-region?x1=${areaPosition.latTop}&y1=${areaPosition.lngTop}&x2=${areaPosition.latBottom}&y2=${areaPosition.lngBottom}`;

export const getClusterMapInfoUrl = (areaPosition) => 
    baseUrl + `trees-cluster/get-in-region?x1=${areaPosition.latTop}&y1=${areaPosition.lngTop}&x2=${areaPosition.latBottom}&y2=${areaPosition.lngBottom}`;

export const getTreeDataUrl = (treeId) => baseUrl + `tree/get/${treeId}`;

export const getTreeAddUrl = () => baseUrl + "tree/save";