import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

import InfoCard from './../common/info-card/info-card.component'
import Map from './../common/map/map.component'
import LineGraph from './../common/graph/graph.component'
import Table from './../common/table/table.component'

import 'leaflet/dist/leaflet.css'

function MainContent() {
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('IN')
    const [countryObj, setCountryObj] = useState({"name":"India","value":"IN"})
    const [countryInfo, setCountryInfo] = useState({})
    const [countryRawData, setCountryRawData] = useState([])
    const [caseType, setCaseType] = useState('confirmed')
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
    const [mapZoom, setMapZoom] = useState(3)

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
            const allCountries = data.map(obj => {
                return {
                    name: obj.country,
                    value: obj.countryInfo.iso2
                }
            })
            const updatedCountryInfo = data.filter(obj => obj.countryInfo.iso2 === 'IN')[0]
            const updatedMapCenter = {lat: updatedCountryInfo.countryInfo.lat, lng: updatedCountryInfo.countryInfo.long}
            setCountryRawData(data.filter(obj => obj.country !== 'Luxembourg'))
            setCountries(allCountries)
            setCountryInfo(updatedCountryInfo)
            setMapCenter(updatedMapCenter)
        })
    }, [])

    const handleChange = (event, newValue) => {
        setCountryObj(newValue)
        const updatedCountryInfo = countryRawData.filter(obj => obj.countryInfo.iso2 === newValue.value)[0]
        setCountry(newValue.value)
        setCountryInfo(updatedCountryInfo)
        setMapCenter({ lat: updatedCountryInfo.countryInfo.lat, lng: updatedCountryInfo.countryInfo.long })
        setMapZoom(4)
        setCaseType('confirmed')
    }

    return (
        <div style={{ padding: '0px 8%', marginTop: '90px' }}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    {countryInfo && countryInfo.country ? (
                        <div className='c19LeftContent'>
                            <Grid container className='c19ExploreCountry'>
                                <Grid item xs={4}>
                                    <FormControl className='c19CountryDropDown'>
                                        {countries && countries.length ? (
                                            <Autocomplete
                                                options={countries}
                                                getOptionLabel={(option) => {
                                                    return option.name
                                                }}
                                                id="c19Countries"
                                                value={countryObj}
                                                onChange={handleChange}
                                                renderInput={(params) => <TextField {...params} label="Countries" margin="normal" />}
                                            />
                                        ) : null}
                                        <FormHelperText>Select counry you want to explore</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs='auto'>
                                    <img src={countryInfo.countryInfo.flag} width='100' alt={countryInfo.country}/>
                                </Grid>
                            </Grid>
                            <Grid 
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch"
                                spacing={2}
                                className='countryStats'
                            >
                                <Grid item xs={3}>
                                    <InfoCard
                                        title='Confirmed'
                                        active={caseType==='confirmed'}
                                        cases={countryInfo.cases}
                                        todayCases={countryInfo.todayCases}
                                        onClick={() => setCaseType('confirmed')}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InfoCard
                                        title='Active'
                                        cases={countryInfo.active}
                                        onClick={() => setCaseType('activeCases')}
                                        active={caseType==='activeCases'}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InfoCard
                                        title='Recovered'
                                        cases={countryInfo.recovered}
                                        todayCases={countryInfo.todayRecovered}
                                        onClick={() => setCaseType('recovered')}
                                        active={caseType==='recovered'}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InfoCard
                                        title='Deaths'
                                        cases={countryInfo.deaths}
                                        todayCases={countryInfo.todayDeaths}
                                        onClick={() => setCaseType('deaths')}
                                        active={caseType==='deaths'}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className='worldMap'
                            >
                                <Grid item xs={12}>
                                    <Map
                                        caseType={caseType}
                                        countries={countryRawData}
                                        center={mapCenter}
                                        zoom={mapZoom}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ) : null}
                </Grid>
                <Grid item xs={4}>
                    <div className='c19RightContent'>
                        <Grid container>
                            <Grid item xs={12}>
                                {countryInfo && countryInfo.countryInfo ? (
                                    <LineGraph 
                                        className='lineGraph' 
                                        caseType={caseType}
                                        country={countryInfo.countryInfo.iso2}
                                    />
                                ) : null}
                            </Grid>
                            <Grid item xs={12}>
                                {}
                                <Table countries={countryRawData} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default MainContent
