import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getAirTimes } from './transport'
import './App.css'
import DVLogo from './logo.png'

function App() {
  const [airtimes, setAirtimes] = useState(null)

  useEffect(() => {
    getAirTimes().then(incaaAirtimesResponse =>
      setAirtimes(incaaAirtimesResponse),
    )
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
          <>
            {airtimes.map(airtime => (
              <Airtime
                key={`${airtime.hora_inicio}-${airtime.day}`}
                time={airtime.hora_inicio}
                day={airtime.day}
                month={airtime.month}
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

const Airtime = ({ time, day, month }) => {
  const airtimeText = `${day} de ${month} a las ${time}`

  return <div className='airtime'>{airtimeText}</div>
}

Airtime.propTypes = {
  time: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
}

export default App
