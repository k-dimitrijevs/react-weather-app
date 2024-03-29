import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();

  const kelvinToCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const kelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * 1.8 + 32);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col py-10 mx-24 my-12">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          className="border border-gray-300 p-2 rounded-md"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-400 hover:bg-purple-500 text-white p-2 rounded-md ml-5"
        >
          Get Weather
        </button>
      </form>

      {weather && (
        <div 
          className="shadow-lg rounded-lg px-4 py-7 bg-purple-400 mt-7"
        >
          <h2 className="text-2xl text-purple-900 font-semibold mb-3">{weather.name}</h2>
          {/* {weather.weather[0].description} make the first letter uppercase */}
          <p className="text-white">
            {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
          </p>
          <p className="text-white">Celsius: {kelvinToCelcius(weather.main.temp)}</p>
          <p className="text-white">Fahrenheit: {kelvinToFahrenheit(weather.main.temp)}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
