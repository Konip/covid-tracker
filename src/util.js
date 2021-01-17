import { React } from 'react';
import numeral from "numeral"
import { Circle, Popup } from 'react-leaflet';
import "./Map/Map.css"

const casesTypeColors = {
    cases: {
        color: "#CC1034",
        fillColor: "#CC1034",
        multiplier: 300,
    },
    recovered: {
        multiplier: 450,
        color: "#7dd71d",
        fillColor: "#7dd71d"
    },
    deaths: {
        multiplier: 1900,
        color: "#4b1414",
        fillColor: "#4b1414"
    },
}
export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0,0a")}` : "+0"

export const sortData = (data) => {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1
        } else {
            return 1
        }

    })
    return sortedData
}
// рисует круги на карте
export const showDataOnMap = (data, casesType) => (
    data.map((country, index) => (
        <Circle key={index} center={[country.countryInfo.lat, country.countryInfo.long]} fillOpacity={0.4}
            pathOptions={casesTypeColors[casesType]}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
)

