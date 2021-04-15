const colors = {
    "береза": "#696969",
    "вяз": "#800080",
    "липа": "#654321",
    "лиственница": "#218766",
    "default": "blue"
}


export const fetchData = (url, options) => {
    return fetch(url, options)
        .then(r => r.json())
        .then(data => data.features);
}

export const getColorByTreeName = (name = "default") => {
    return colors[name] ?? colors["default"]
};

export const getCircleOptions = (treeName) => {
    const color = getColorByTreeName(treeName);
    return {fillColor: color, color};
}

export const getCircleRadius = (height) => {
    const logValue = height < 7 ? 2 : Math.log(height);
    return logValue / 2 + 1;
}