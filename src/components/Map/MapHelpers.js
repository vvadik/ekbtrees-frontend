const colors = {
    "Береза": "#696969",
    "Вяз": "#800080",
    "Липа": "#654321",
    "Лиственница": "#218766",
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

export const getCircleRadius = (diameter_crown) => {
    const circleDiameter = diameter_crown < 5 ? 5 * 0.8 : diameter_crown * 0.8;
    return circleDiameter / 2;
}