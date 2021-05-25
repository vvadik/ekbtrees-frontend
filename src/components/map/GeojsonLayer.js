import React, { useState, useEffect } from 'react';
import { Circle, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import ColorProvider from "./ColorProvider";

function fetchData(url, options) {
  let request = fetch(url, options);

  return request
    .then(r => r.json())
    .then(data => data.features);
}

function circleOptions(name) {
  var color = ColorProvider(name);
  return {
    fillColor: color,
    color: color
  };
}

function circleRadius(height) {
  var logValue = height < 7 ? 2 : Math.log(height);
  return logValue / 2 + 1;
}

const GeojsonLayer = ({ url }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (url) {
      const abortController = new AbortController();

      fetchData(url, { signal: abortController.signal }).then(data => {
        setData(data);
      });

      // cancel fetch on component unmount
      return () => {
        abortController.abort();
      };
    }

  }, [url]);

  // console.info(data);

  return (
    <MarkerClusterGroup disableClusteringAtZoom={19}>
      {data
        .filter(feaure => feaure.geometry.type === "Point")
        .map((f, idx) => (
          <Circle
            key={idx}
            center={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            pathOptions={circleOptions(f.properties["genus:ru"])}
            radius={circleRadius(f.properties.height ?? 3)}
            weight={1}
          >
            <Popup minWidth={200} closeButton={false}>
              <div>
                <b>{f.properties["genus:ru"]}</b>
                {f.properties.height && <p>Высота: {f.properties.height}</p>}
                <p>{f.geometry.coordinates[1]} {f.geometry.coordinates[0]}</p>
              </div>
            </Popup>
          </Circle>
        ))}
    </MarkerClusterGroup>
  );
}

export default GeojsonLayer;