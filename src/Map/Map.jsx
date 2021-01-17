import React, { useEffect } from 'react'
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import { showDataOnMap } from '../util';
import "./Map.css"

function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function Map({ countries, casesType, center, zoom }) {
    

    return (
        <div className="map">
            <LeafletMap >
                <ChangeMap center={center} zoom={zoom} />
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>


        </div>
    )
}
