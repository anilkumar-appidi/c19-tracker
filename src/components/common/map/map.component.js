import React from 'react'
import { Map as LeafletMap, Circle, Popup, TileLayer } from 'react-leaflet'

import './map.css'

const casesTypeColors = {
    confirmed: {
        hex: "#999",
        multiplier: 800
    },
    recovered: {
        hex: "#16D39A",
        multiplier: 1000
    },
    activeCases: {
        hex: "#1997eb",
        multiplier: 1200
    },
    deaths: {
        hex: "#FF7588",
        multiplier: 2000
    }
}

const casesType = {
    confirmed: 'cases',
    activeCases: 'active',
    recovered: 'recovered',
    deaths: 'deaths'
}

export default function Map({ countries, caseType, center, zoom }) {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {countries.map((country) => (
                    <Circle
                        center={[country.countryInfo.lat, country.countryInfo.long]}
                        fillOpacity={0.4}
                        color={casesTypeColors[caseType].hex}
                        fillColor={casesTypeColors[caseType].hex}
                        radius={
                            Math.sqrt(country[casesType[caseType]]) * casesTypeColors[caseType].multiplier
                        }
                        key={country.country}
                    >
                        <Popup>
                            <div className="info-container">
                            <div
                                className="info-flag"
                                style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                            />
                            <div className="info-name">{country.country}</div>
                            <div className="info-confirmed">
                                Cases: {country.cases}
                            </div>
                            <div className="info-recovered">
                                Recovered: {country.recovered}
                            </div>
                            <div className="info-deaths">
                                Deaths: {country.deaths}
                            </div>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </LeafletMap>
        </div>
    )
}