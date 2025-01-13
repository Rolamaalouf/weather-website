import { DateTime } from "luxon";

const API_KEY = '7c36fb9dcccb83d4d7406be1fd23af4c'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null; // Return null or an empty object to indicate failure
    }
  };

// turn icon code to an img 
const iconUrlFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;


// use single quate to get the value of the variable
const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' |  Local time: 'hh: mm a")=>  
DateTime.fromSeconds(secs + offset, {zone: 'utc'}).toFormat(format)
const formatCurrent = (data) => {
    if (!data || !data.coord) {
      console.error("Invalid or incomplete weather data:", data);
      return null; // Return null or a default object
    }
  
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
      timezone,
    } = data;
  
    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);
  
    return {
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      country,
      sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
      sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
      speed,
      details,
      icon: iconUrlFromCode(icon),
      formattedLocalTime,
      dt,
      lat,
      lon,
    };
  };


const formatCurrentWeather = (secs, offset, data) => {// secs=dt, offset= timezone ,
    //hourly
    const hourly = data.filter(f => f.dt > secs ) // filter to get the next hour data and only the new one
   
    .map((f)=> ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }))
    .slice(0, 5)

    //daily

    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'ccc'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }))

    return { hourly, daily }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams);
    if (!formattedCurrentWeather) {
      console.error("Failed to fetch current weather data");
      return null; // Return null or a default object
    }
  
    const { dt, lat, lon, timezone } = formattedCurrentWeather;
  
    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });
    if (!formattedForecastWeather) {
      console.error("Failed to fetch forecast weather data");
      return null; // Return null or a default object
    }
  
    return {
      ...formattedCurrentWeather,
      ...formatCurrentWeather(dt, timezone, formattedForecastWeather.list),
    };
  };
export default getFormattedWeatherData;

