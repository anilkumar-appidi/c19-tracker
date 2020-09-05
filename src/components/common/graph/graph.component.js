import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"

const casesType = {
    confirmed: 'cases',
    activeCases: 'active',
    recovered: 'recovered',
    deaths: 'deaths'
}

const casesTypeHex = {
    confirmed: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#000'
    },
    activeCases: {
        backgroundColor: 'rgba(25, 151, 235, 0.5)',
        borderColor: '#1997eb'
    },
    recovered: {
        backgroundColor: 'rgba(22, 211, 154, 0.5)',
        borderColor: '#16d39a'
    },
    deaths: {
        backgroundColor: 'rgba(255, 117, 136, 0.5)',
        borderColor: '#ff7588'
    }
}

const options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return tooltipItem.value
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          callback: function (value, index, values) {
            return value
          }
        }
      }
    ]
  }
}

const buildChartData = (data, caseType) => {
  let chartData = []
  let lastDataPoint
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[caseType][date]
  }
  return chartData;
}

export default function LineGraph({ caseType, country, ...props }) {
  const [data, setData] = useState({})
  const updatedCaseType = casesType[caseType]

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`)
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data.timeline, updatedCaseType)
          setData(chartData)
        })
    }
    fetchData()
  }, [caseType, country])

  return (
    <div className={props.className}>
      {data && data.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: casesTypeHex[caseType].backgroundColor,
                borderColor: casesTypeHex[caseType].borderColor,
                data: data
              }
            ]
          }}
        />
      )}
    </div>
  )
}
