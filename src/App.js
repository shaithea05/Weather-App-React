import React, { useState } from "react";
import axios from "axios";
import slothImage from "./assets/sloth.png";
import tryAgain from "./assets/tryAgain.png";

// require("dotenv").config();

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = process.env.REACT_APP_SECRET_KEY;

  console.log("API Key:", apiKey);

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const location = event.target.value; // Make sure to get the location from the input field
      const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=` +
        apiKey;

      console.log("URL:", url);

      try {
        const response = await axios.get(url);
        if (response.data.cod === "404") {
          setData({
            error:
              "City not found! Please check the spelling or try a different city.",
          });
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
        setData({
          error:
            "An error has occurred. Please enter another city or refresh the page.",
        });
      }
      event.target.value = "";
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
        {data.error ? (
          <>
            <h2>{data.error}</h2>
            <img className="tryAgain" src={tryAgain} alt="Try Again Image" />
          </>
        ) : data.name === undefined ? (
          <>
            <h2>Welcome to Shaithea's Weather App</h2>
            <img className="sloth" src={slothImage} alt="Sloth Welcome Image" />
          </>
        ) : null}
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
        {data.name != undefined && (
          <div className="refresh">
            <h3>Refresh to restart!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
