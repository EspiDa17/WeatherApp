import React, { useState, useEffect } from "react";
import styles from './Weather.module.css'

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {      
      
      //const API_KEY = import.meta.env.VITE_API_KEY; //Me traigo la api key del archivo .env
      //const URL = import.meta.env.VITE_URL; //Me traigo la URL del archivo .env
      const API_KEY = 'e99d57bf93b9887bbc4342f795766e94';
      const URL = 'http://api.openweathermap.org/data/2.5/weather';
      const city = props.city;
      const response = await fetch(`${URL}?appid=${API_KEY}&q=${city}&lang={lang}&units=metric`);
      const data = await response.json();
      
      if (data.cod === "404") {
        setErrorMessage(`No se encontró información para la ciudad "${city}"`);
        setWeatherData({});
        props.onTemperatureChange(null); // Envía null si no hay datos válidos
      } else {
        console.log("Llegó la información de la ciudad solicitada");
        setWeatherData(data);
        console.log(data);       
        
        setErrorMessage("");
        // Llama a la función para pasar la temperatura a App
        props.onTemperatureChange(data.main.temp);
      }
    };
    fetchData();
  }, [props.city, props.onTemperatureChange]);

  const getWeatherIcon = (weatherId) => {
    return  'https://openweathermap.org/img/wn/'+ weatherId +'@2x.png';
  };


  return (
    <div className={styles.contWeather}>
      {errorMessage !== "" ? (
        <p>{errorMessage}</p>
      ) : weatherData.name ? (
        <div className={styles.infoWeather}>
          <h1 className={styles.h2}>Clima en {weatherData.name}</h1>
          <img className={styles.img} src={`${getWeatherIcon(weatherData.weather[0].icon)}`} alt={weatherData.weather[0].description}/>
          <p className={styles.p}>Temperatura: {weatherData.main.temp}°C</p>
          <p className={styles.p}>Humedad: {weatherData.main.humidity}%</p>
          <p className={styles.p}>Nubosidad: {weatherData.clouds.all}</p>
          <p className={styles.p}>V Viento: {weatherData.wind.speed} km/h</p>
          <p className={styles.p}>Ubicacion: {weatherData.coord.lat} {weatherData.coord.lon}</p>
        </div>
      ) : (
        <p className={styles.p}>Ingresa una ciudad para consultar el clima</p>
      )}
    </div>
  );
};

export default Weather;
