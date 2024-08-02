import React, { useState } from "react";
import axios from "axios";
import slothImage from "./assets/sloth.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1ca9063cc0a792252ba8bb70b97291d1`;

  const searchLocation = (event) => {
    if (event.key == "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="welcome">
        {data.name === undefined && (
          <>
            <h2>Welcome to Shaithea's Weather App</h2>
            <img className="sloth" src={slothImage} alt="Sloth Welcome Image" />
          </>
        )}
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            <div className="tempRange">
              <div className="maxTemp">
                {data.main ? (
                  <p>Max: {data.main.temp_max.toFixed()}°F</p>
                ) : null}
              </div>
              <div className="minTemp">
                {data.main ? (
                  <p>Min: {data.main.temp_min.toFixed()}°F</p>
                ) : null}
              </div>
            </div>
          </div>
          {/* <div className="minTemp">
            {data.main ? <p>min:{data.main.temp_min.toFixed()}°F</p> : null}
          </div>
          <div className="maxTemp">
            {data.main ? <p>max:{data.main.temp_max.toFixed()}°F</p> : null}
          </div> */}
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="winds">
              <p>Wind Speed</p>
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
