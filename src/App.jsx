import { useEffect, useState } from "react";
import WeatherContainer from "./components/WeatherContainer";
import "./App.css";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [weather, setWeather] = useState(null);
  
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [])
  
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])
  
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  const success_geolocation = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const api_key = "dbfffa2a1d3925580e7d54e7c5db1890";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then(({ data }) => {
        setWeather(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success_geolocation);
  }, []);

  const [renderizado, setRenderizado] = useState(false);
  useEffect(() => {
    // Simulamos una pequeña demora para que puedas ver la transición
    setTimeout(() => {
      setRenderizado(true);
    }, 4000); // Espera 1 segundo antes de aplicar la clase
  }, []);

  return (
    <div>
      <main
      className='font-["Lato"] flex justify-center items-center min-h-screen bg-cover bg-center text-black dark:text-white bg-neutral-200 bg-opacity-50 transition-all duration-300 ease-out ${
        theme === "dark" ? "dark:bg-opacity-70 dark:bg-black" : ""
      }`'
      style={ weather !== null ? (renderizado ? ({backgroundColor: theme==="dark" ? "rgba(0, 0, 0, 0.7)" : "transparent", backgroundImage: `url(/bg-images/bg_image_${weather.weather[0].icon}.jpeg)`}) : ({listStyle: `none`}) ) : ({listStyle: `none`})}
    >
      {weather !== null ? (
        renderizado ? (
          <WeatherContainer weather={weather} setWeather={setWeather} theme={theme} handleThemeSwitch={handleThemeSwitch}></WeatherContainer>
        ) : (
          <Loader></Loader>
        )
      ) : (
        <Loader></Loader>
      )}
    </main>
    <div>
      {theme === "dark" ? (
          <div
            className="absolute inset-0 bg-black opacity-20 pointer-events-none"
            style={{ mixBlendMode: "multiply" }}
          ></div>
        ) : (
          <div></div>
        )
      }
    </div>
    </div>
    
  );
}

export default App;
