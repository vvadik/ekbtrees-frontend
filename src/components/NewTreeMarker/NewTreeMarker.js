import { Marker } from 'react-leaflet';
import { icon } from 'leaflet';
import { useRef, useMemo } from "react";
import styles from "./NewTreeMarker.css";
import markerIcon1x from '../../img/marker-icon.png';
import markerIcon2x from '../../img/marker-icon-2x.png';

export const NewTreeMarker = ({position, setPosition, ...props }) => {
    const markerIcon = icon({
        iconUrl: markerIcon1x,
        iconRetinaUrl: markerIcon2x,
        iconSize: [25, 41],
    });
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
            }
          },
        }),
      [],
    )
    
    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={ markerIcon } 
            { ...props } />
    )
} 