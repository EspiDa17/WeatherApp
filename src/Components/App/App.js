import React, { useState } from "react";
import Weather from "../Weather/Weather";
import styles from './App.module.css'

const App = () => {

  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null); // Estado para la temperatura

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim().length >= 3) return alert("Ingresa un nombre de ciudad válido");
    setCity(city);
  };

  // Función para actualizar la temperatura desde el componente Weather
  const handleTemperatureChange = (temperature) => {
    setTemperature(temperature);
  };

  console.log("La temperatura es: ", temperature);
  

  // Función para obtener la imagen según la temperatura
  const getTemperatureImage = () => {
    if (temperature === null) return "images/loading.gif"; // Imagen por defecto
    if (temperature < 5) return "images/frio.gif";
    if (temperature >= 5 && temperature <= 15) return "images/frio_moderado.gif";
    if (temperature >= 16 && temperature <= 25) return "images/ambiente.gif";
    if (temperature > 25 && temperature <= 35) return "images/calor_moderado.gif";
    if (temperature > 35) return "images/calor.gif";
     
  };

  console.log("La imagen que se va mostrar es: ", getTemperatureImage());
  
  
  return (
    <div className={styles.contPrincipal}>
      <div className={styles.contTitulo}>
        <h1 className={styles.titulo}>Weather App</h1>
      </div>
      <div className={styles.contContenido}>
        <div className={styles.contIzquierdo}>
          <img src={getTemperatureImage()} alt="imagen según temperatura" />
        </div>
        <div className={styles.contDerecho}>
          <form onSubmit={handleSubmit}>
            <input className={styles.input}type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
          </form>
          <Weather city={city} onTemperatureChange={handleTemperatureChange}/>
        </div>
      </div>
    </div>
  );
};

export default App;
