import { useState, useEffect } from "react";

import getWeather from "../services/weatherService";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getWeather(city).then((data) => setWeather(data));
  }, [city]);

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <p>Temperature: {weather.main.temp}°C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h3>Weather in {country.capital}</h3>
      <Weather city={country.capital} />
    </div>
  );
};

export default Country;
