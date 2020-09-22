import React, { useState, useEffect } from 'react'

function Header() {
    const [ globalInfo, setGlobalInfo ] = useState({})

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then(data => {
                setGlobalInfo(data)
            })
    }, [])
    
    return (
        <div className='c19header'>
            <div className='c19logo'>
                <img src='./c19logo.svg' width='50' height='50' alt='c19 tracker' />
                <h1 className='c19text'><span>C19</span> Tracker</h1>
            </div>
            <div className='c19GlobalData'>
                <div className='c19TotalCases'>
                    <p className='confirmedLabel'>Confirmed</p>
                    <p className='confirmedCases'>{globalInfo.cases}</p>
                    <p className='todayCases'>+{globalInfo.todayCases}</p>
                </div>
                <div className='c19ActiveCases'>
                    <p className='activeLabel'>Active</p>
                    <p className='activeCases'>{globalInfo.active}</p>
                </div>
                <div className='c19RecoverCases'>
                    <p className='recoveredLabel'>Recovered</p>
                    <p className='recoveredCases'>{globalInfo.recovered}</p>
                    <p className='todayRecoveredCases'>+{globalInfo.todayRecovered}</p>
                </div>
                <div className='c19DeathCases'>
                    <p className='deathLabel'>Deaths</p>
                    <p className='deathCases'>{globalInfo.deaths}</p>
                    <p className='todayDeathCases'>+{globalInfo.todayDeaths}</p>
                </div>
            </div>
        </div>
    )
}

export default Header
