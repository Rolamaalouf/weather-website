import { useEffect, useState } from "react";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Beirut");
  const [inputValue, setInputValue] = useState("Beirut"); // New state for raw input
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        // Update background based on temperature
        const threshold = units === "metric" ? 10 : 50; // 50°F = 10°C
        if (data.temp <= threshold) {
          setBg(coldBg);
        } else {
          setBg(hotBg);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    fetchWeatherData();
  }, [city, units]);

  // Debounce mechanism for input changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (inputValue.trim()) {
        setCity(inputValue.trim()); // Update city after debouncing
      }
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout); // Cleanup timeout on input change
  }, [inputValue]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13 && inputValue.trim()) {
      setCity(inputValue.trim());
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                placeholder="Enter City..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="Weather Icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/* Bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
