import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './App.css'
import DVLogo from './logo.png'

function App() {
  const [airtimes, setAirtimes] = useState(null)
  useEffect(() => {
    async function getAirTimes() {
      const body = await fetch(
        'https://raw.githubusercontent.com/anabellaspinelli/incaa-tv-movie-times/master/airtimes.json',
      )
        .then(res => res.json())
        .catch(e => console.error(e))
      setAirtimes(body)
    }

    getAirTimes()
  }, [])

  if (!airtimes) {
    return null
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={DVLogo} className='logo' />
        <h1>¿Cuándo pasan Diablo Viejo?</h1>
        {airtimes.length ? (
          // [].length ?
          <>
            {airtimes.map(airtime => (
              <Airtime
                key={`${airtime.hora_inicio}-${airtime.day}`}
                time={airtime.hora_inicio}
                day={airtime.day}
              />
            ))}

            <h2>en cine.ar</h2>
          </>
        ) : (
          <h2>No la pasan este mes :(</h2>
        )}
      </header>
    </div>
  )
}

const Airtime = ({ time, day }) => {
  const getMonth = () => {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]

    const date = new Date()
    return monthNames[date.getMonth()]
  }

  return (
    <div>
      {`${day} de ${getMonth()} a las ${time}`}
      <span>(GMT-3)</span>
    </div>
  )
}

Airtime.propTypes = {
  time: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
}

export default App
