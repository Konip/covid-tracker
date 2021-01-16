import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent, Typography } from '@material-ui/core';
import InfoBox from './InfoBox/InfoBox';
import Map from './Map/Map';
import Table from './Table/Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph/LineGraph';
import "leaflet/dist/leaflet.css"


function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))

          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
          setMapCountries(data)

        })
    }
    getCountriesData()
  }, [])


  const onContryChange = async (event) => {
    const contryCode = event.target.value
    setCountry(contryCode)

    const url = contryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/countries/all"
      : `https://disease.sh/v3/covid-19/countries/${contryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(contryCode)
        setCountryInfo(data)

        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })
  }


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select onChange={onContryChange} variant="outlined" value={country}>
              <MenuItem value="worldwide" > Worldwide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}> {country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            Red
            active={casesType === "cases"}
            onClick={e => setCasesType("cases")}
            title="Coronavirus Cases"
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)} />
          <InfoBox
            active={casesType === "recovered"}
            onClick={e => setCasesType("recovered")}
            title="Recovered"
            total={prettyPrintStat(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)} />
          <InfoBox
            Red
            active={casesType === "deaths"}
            onClick={e => setCasesType("deaths")}
            title="Deaths"
            total={prettyPrintStat(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)} />

        </div>
        <Map casesType={casesType} center={mapCenter} zoom={mapZoom} countries={mapCountries} />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}
export default App;

