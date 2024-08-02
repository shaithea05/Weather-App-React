import React, {useState} from 'react'
import axios from 'axios'

function App() {

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=boston&appid=1ca9063cc0a792252ba8bb70b97291d1`

  return (
    <div className="app">
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>Boston</p>
          </div>
          <div className='temp'>
            <h1>65°F</h1>
          </div>
          <div className='description'>
            <p>Cloudy</p>
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            <p>65°F</p>
          </div>
          <div className='humidity'>
            <p>25%</p>
          </div>
          <div className='winds'>
            <p>12MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
