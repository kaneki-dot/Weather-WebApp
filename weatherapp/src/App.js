import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = "452279e54163b15be55c9d95f38728cb";

  const [searchCity, setSearchCity] = useState(""); // State to track user input
  const [weather, setWeather] = useState({});

  const LoadWeather = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log("Error while calling API: ", error);
    }
  };

  useEffect(() => {
    LoadWeather("Delhi");
  }, []);

  const dateBuilder = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const d = date.getDate();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${d} ${month} ${year}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      LoadWeather(searchCity);
      setSearchCity("");
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)} // Update the searchCity state
            onKeyPress={handleKeyPress} // Call handleKeyPress when Enter key is pressed
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)  }°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
