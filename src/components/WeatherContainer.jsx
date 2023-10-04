import { useState } from "react";
import WeatherStat from "./WeatherStat";
import countryList from 'country-list';
import { useEffect } from "react";

const WeatherContainer = ({ weather,setWeather,theme,handleThemeSwitch }) => {
  console.log(weather)
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    const input = document.getElementById('miInput');
    input.addEventListener('input', function () {
    const i = this.nextElementSibling;
    const i2 = document.getElementById('search');
    if (this.value.trim() !== '') {
      i.classList.add('hidden');
      i2.classList.remove('hidden');
    } else {
      i.classList.remove('hidden');
      i2.classList.add('hidden');
    }
    });
  }, [])

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const apiKey = 'dbfffa2a1d3925580e7d54e7c5db1890';
  let lastCity = null;
  const searchWeather = () => {
    lastCity = city;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error('Error al buscar el clima:', error);
      });
      const miFuncion = () => {
        input.value=""
      input.removeEventListener('input',miFuncion)
      }
    setCity(`Buscaste : ${lastCity}`);
    const input = document.getElementById('miInput');
    input.addEventListener('input', miFuncion)
  };

  const changeUnitTemp = (temp) => {
    if (isCelsius) {
      const celsiusTemp = (temp - 273.15).toFixed(1);
      return `${celsiusTemp} °C`;
    } else {
      const farenheitTemp = ((temp - 273.15) * (9 / 5) + 32).toFixed(1);
      return `${farenheitTemp} °F`;
    }
  };

  const handleChangeUnit = () => {
    setIsCelsius(!isCelsius);
  };
  
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  };

  const descriptionsWeather= {
    "clear sky" : "cielo despejado",
    "few clouds" : "pocas nubes",
    "scattered clouds" : "probablemente nublado",
    "broken clouds" : "mayormente nublado",
    "overcast clouds" : "mayormente nublado",
    "shower rain" : "aguacero",
    "light rain" : "lluvia",
    "rain" : "lluvia",
    "thunderstorm" : "tormenta eléctrica",
    "snow" : "nieve",
    "mist" : "ventisca",
    "haze" : "ventisca",
  }

  const countryName = countryList.getName(weather.sys.country);

  return (
    <section className="text-center grid gap-[5vh] lg:gap-[3vh] px-[2vw] ">
      <header className="flex items-center md:text-[3.7vw] lg:text-[1.6vw] 2xl:text-[1.03vw] justify-evenly m-auto">
        <div className="flex items-center relative">
          <input className="w-[50vw] lg:w-[30vw] 2xl:w-[25vw] bg-slate-500/50 dark:bg-zinc-500/50 rounded-[2rem] mr-[2vw] focus:outline-none focus:border-blue-500 pl-[4vw] 2xl:pl-[1vw] md:pl-[2vw] transition duration-300 ease-in-out" type="text" id="miInput" value={city} onChange={handleInputChange} onKeyPress={handleEnterKeyPress}/>
          <label htmlFor="miInput" className="absolute inset-y-0 left-0 pl-[3.2vw] flex items-center text-black/75 dark:text-white transition-all duration-300 ease-out">
            <i className='bx bx-search-alt-2'></i>
            <span className="pl-[2vw]">Busca una ciudad</span>
          </label>
          <i className='bx bx-search-alt-2 hidden cursor-pointer' onClick={searchWeather} id="search"></i>
        </div>
        <button onClick={handleThemeSwitch} className="flex items-center rounded-xl bg-white p-2 w-12 h-6 ml-7">
          <span className="bg-blue-400 text-transparent rounded-full w-5 justify-end h-5 -translate-x-1 dark:translate-x-4 dark:bg-[#53388F]"></span>
        </button>
      </header>
      <h3 className="text-xl font-semibold mt-[5vh] md:text-[8vw] lg:text-[3.5vw] 2xl:text-[2.5vw] md:mb-[6vh]">
        {weather.name}, {countryName}
      </h3>
      <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
        {/* Seccion superior */}
        <article className="bg-slate-500/50 rounded-3xl grid grid-cols-2 items-center p-3 dark:bg-zinc-500 dark:bg-opacity-50">
          <h4 className="col-span-2 text-[6vw] capitalize md:text-[5.5vw] 2xl:text-[1.8vw] p-2 md:p-4 lg:text-[2.4vw]">
            {descriptionsWeather[weather.weather[0].description]}
          </h4>
          <span className="text-[12vw] md:text-[6vw] lg:text-[3vw] p-2">{changeUnitTemp(weather.main.temp)}</span>
          <picture>
            <img className="m-auto"
            src={`/icons-render/${weather.weather[0].icon}.png`}
            alt="" 
            />
          </picture>
        </article>
        {/* Seccion inferior */}
        <article className="grid grid-cols-3 justify-items-center lg:text-[2vw] 2xl:text-[1vw] bg-slate-500/50 rounded-xl p-2 py-3 sm:grid-cols-1 md:text-[3vw] dark:bg-zinc-500 dark:bg-opacity-50">
          <WeatherStat
            {
              ...(theme === "light" ? {icon:"/icon-stats/wind_black.png"} : {icon:"/icon-stats/wind.png"})
            }
            value={weather.wind.speed}
            unit=" m/s"
          ></WeatherStat>
          <WeatherStat
            {
              ...(theme === "light" ? {icon:"/icon-stats/humidity_black.png"} : {icon:"/icon-stats/humidity.png"})
            }
            value={weather.main.humidity}
            unit="%"
          ></WeatherStat>
          <WeatherStat
            {
              ...(theme === "light" ? {icon:"/icon-stats/pressure_black.png"} : {icon:"/icon-stats/pressure.png"})
            }
            value={weather.main.pressure}
            unit=" hPa"
          ></WeatherStat>
        </article>
      </div>
      {isCelsius ? (
        <button
          className="bg-white md:text-[3vw] text-blue-500 font-semibold w-[50vw] md:w-[30vw] 2xl:max-w-[9vw] 2xl:text-[1vw] lg:text-[1.4vw] lg:w-[18vw] m-auto rounded-2xl py-1 dark:text-white dark:bg-blue-500"
          onClick={handleChangeUnit}
        >
          Cambiar a °F
        </button>
      ) : (
        <button
        className="bg-white md:text-[3vw] text-blue-500 font-semibold w-[50vw] md:w-[30vw] 2xl:max-w-[9vw] 2xl:text-[1vw] lg:text-[1.4vw] lg:w-[18vw] m-auto rounded-2xl py-1 dark:text-white dark:bg-blue-500" 
        onClick={handleChangeUnit}>Cambiar a °C</button>
      )}
      <div className="font-semibold text-md mt-[5vh] md:text-[2.5vw] lg:text-[1.3vw] 2xl:text-[0.9vw]">Fotos: pixabay.com</div>
    </section>
  );
};
export default WeatherContainer;
