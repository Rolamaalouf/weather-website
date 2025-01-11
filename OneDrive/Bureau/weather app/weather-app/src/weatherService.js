const API_KEY = "c82e056566abc1869b2c31b4ee51a28a";

const makeIconURL = (iconId) =>
    `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    
    // Make the fetch request
    const response = await fetch(URL);
    
    // Check if the response is okay
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
    } = data;

    const { description, icon } = weather[0];

    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };
};

export { getFormattedWeatherData };