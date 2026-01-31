import { useState, useEffect } from 'react'
import wmoImageMapping from '../data/wmo_codes.json';
import countryService from '../services/countries'
import weatherService from '../services/weather'

const formatWindSpeed = (speed, unit) => {
  if (unit === 'km/h') return (speed / 3.6).toFixed(2) + " m/s";
  else return speed + " " + unit;
}

const CountryData = ({ countryData }) => {
  return (
    <div>
      <h2>{countryData.name.common}</h2>
      <p>Capital: {countryData.capital ? countryData.capital[0] : "N/A"}</p>
      <p>Population: {countryData.population || "N/A"}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(countryData.languages || {}).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} width="200"/>
    </div>
  )
}

const WeatherView = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [weatherError, setWeatherError] = useState(null)

  useEffect(() => {
    if (!countryData.capitalInfo || !countryData.capitalInfo.latlng || countryData.capitalInfo.latlng.length < 2) {
      setWeatherError("Unable to fetch weather data: missing capital coordinates");
      return;
    }
    weatherService.getWeather(countryData.capitalInfo.latlng[0], countryData.capitalInfo.latlng[1])
      .then(data => setWeatherData(data), error => {
        setWeatherError("Failed to fetch weather data")
      });
  }, [countryData])

  if (weatherError) {
    return <p>{weatherError}</p>
  }
  if (!weatherData) {
    return <p>Loading weather data...</p>
  }

  return (
    <div>
      <h2>Weather in {countryData.capital[0]}</h2>
      <p>Temperature: {weatherData.current_weather.temperature} {weatherData.current_weather_units.temperature}</p>
      <img src={wmoImageMapping[weatherData.current_weather.weathercode].day.image} alt="Weather icon" />
      <p>Wind: {formatWindSpeed(weatherData.current_weather.windspeed, weatherData.current_weather_units.windspeed)}</p>
    </div>
  )
}

const CountryView = ({ countryName }) => {
  const [countryData, setCountryData] = useState(null)
  const [countryError, setCountryError] = useState(null)

  useEffect(() => {
    countryService.getData(countryName)
      .then(data => setCountryData(data))
      .catch(error => setCountryError("Failed to fetch country data"))
  }, [countryName])

  if (countryError) {
    return <p>{countryError}</p>
  }
  if (!countryData) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <CountryData countryData={countryData} />
      <WeatherView countryData={countryData} />
    </div>
  )
}

export default CountryView
