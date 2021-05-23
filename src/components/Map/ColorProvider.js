const colors = {
    "береза": "#696969",
    "вяз": "#800080",
    "липа": "#654321",
    "лиственница": "#218766",
    "default": "blue"
}

const ColorProvider = (name = "default") => {
    return colors[name] ?? colors["default"]
};

export default ColorProvider;