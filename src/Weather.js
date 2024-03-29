import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  const kelvinToCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15) + "°C";
  };

  const kelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * 1.8 + 32) + "°F";
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

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setForecast(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchWeather();
    fetchForecast();
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
          className="bg-teal-400 hover:bg-teal-500 text-white p-2 rounded-md ml-5"
        >
          Get Weather
        </button>
      </form>

      {weather && (
        <div 
          className="shadow-lg rounded-lg px-4 py-7 mt-7 bg-teal-400"
        >
          <h2 className="text-3xl text-teal-900 font-semibold mb-3">Current weather</h2>
          <div className="flex w-full items-center">
            <h2 className="text-2xl text-teal-900 font-semibold mb-3 pt-1 mr-2">{weather.name}</h2>
            <img 
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
          {/* {weather.weather[0].description} make the first letter uppercase */}
          <p className="text-white">
            {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
          </p>
          <p className="text-white">{kelvinToCelcius(weather.main.temp)}</p>
          <p className="text-white">Feels like: {kelvinToCelcius(weather.main.feels_like)}</p>
        </div>
      )}

      {forecast && (
        <div className="mt-7">
          <h2 className="text-3xl text-teal-400 font-semibold mb-3">5-day forecast</h2>
          <div className="grid grid-cols-5 gap-4">
            {forecast.list.map((item, index) => {
              if (index % 8 === 0) {
                return (
                  <div 
                    key={index}
                    className="shadow-lg rounded-lg px-4 py-7 bg-teal-400"
                  >
                    <h2 className="text-teal-900 font-semibold">
                      {item.dt_txt.split(" ")[0].split("-").reverse().join("/")}
                    </h2>
                    <div className="flex w-full items-center">
                      <h2 className="text-2xl text-teal-900 font-semibold mb-3 mr-2 pt-1">
                        {forecast.city.name}
                      </h2>
                      <img 
                        src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                      />
                    </div>
                    <p className="text-white">
                      {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
                    </p>
                    <p className="text-white">
                      {kelvinToCelcius(item.main.temp_max)} / {kelvinToCelcius(item.main.temp_min)}
                    </p>
                    <p className="text-white">Feels like: {kelvinToCelcius(item.main.feels_like)}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      
      )}
    </div>
  );
};

export default Weather;
