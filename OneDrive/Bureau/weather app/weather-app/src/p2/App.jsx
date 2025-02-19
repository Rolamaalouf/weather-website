import { useEffect, useState } from "react"
import Forecast from "./compnents/Forecast"
import Inputs from "./compnents/inputs"
import TempAndDetails from "./compnents/TempAndDetails"
import TimeAndLocation from "./compnents/TimeAndLocation"
import TopButtons from "./compnents/TopButtons"
import getFormattedWeatherData from "./services/weatherServices.js"


const App = () => {


  const [query, setQuery] = useState({q: 'london'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


  const getWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      if (!data) {
        console.error("Failed to fetch weather data");
        // Optionally, set a state to show an error message to the user
        setWeather(null);
        return;
      }
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Optionally, set a state to show an error message to the user
      setWeather(null);
    }
  };

  useEffect(() => {
    getWeather()
  }, [query, units]);

  const formatBackground = () => {
    if (! weather) return ' from-cyan-600  to-blue-700';
    const threshold = units === 'metric' ? 20 : 60;
    if(weather.temp <= threshold) return  "from-cyan-600  to-blue-700" ;
    return "from-yellow-600 to-orange-700";
  }

  return (
    <div className= {`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground}`}>
      <TopButtons setQuery={setQuery} />
      < Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
         <TimeAndLocation weather={weather}/>
         <TempAndDetails weather={weather} units={units}/>
         <Forecast title='3 Hours step forecas' data={weather.hourly}/>
         <Forecast title='daily forecas' data={weather.daily}/>
         </>
      )}
     
    </div>
  )
}

export default App
