import React from 'react'
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../util';
import "./Map.css"


export default function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>


        </div>
    )
}
