export const fetchData = (url, options) => {
    return fetch(url, options)
        .then(r => r.json());
}

export const baseUrl = "https://ekb-trees-help.ru/api/";

export const getTreeMapInfoUrl = (container) => 
    baseUrl + `tree-map-info/get-in-region?x1=${container[0].lat}&y1=${container[0].lng}&x2=${container[1].lat}&y2=${container[1].lng}`;

export const getClusterMapInfoUrl = (container) => 
    baseUrl + `trees-cluster/get-in-region?x1=${container[0].lat}&y1=${container[0].lng}&x2=${container[1].lat}&y2=${container[1].lng}`;

export const getTreeDataUrl = (treeId) => baseUrl + `tree/get/${treeId}`;

export const getTreeAddUrl = () => baseUrl + "tree/save";