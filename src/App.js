import React, { useState } from "react";
import search from './icons/searchicon.png';

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [darkMode, setDarkMode] = useState(false);



const fetchWeather = async () => {
    if (!city) return;
  
    setLoading(true);
    setError("");
  
    try {
      const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b03a640e5ef6980o4da35b006t5f2942`;
      const res = await fetch(url);
      const d = await res.json();
  
      if (d.error) {
        setError("City not found");
        setData(null);
      } else {
        setData(d);
      }
    } catch {
      setError("Something went wrong");
    }
  
    setLoading(false);
  };
  

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>

      <div className="input-container">
        <input
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />

        <img
          src={search}
          width={20}
          height={20}
          alt="search"
          onClick={fetchWeather}
          style={{ cursor: "pointer" }}
        />

        <h3>{data?.city}</h3>
      </div>

      {data && (
  <div className="weather-details">
    <h2>{data.city}</h2>
    <img src={data.condition.icon_url} alt="weather" />
    <p>{data.condition.description}</p>

    <p>🌡 Temperature: {data.temperature.current}°C</p>
    <p>💧 Humidity: {data.temperature.humidity}%</p>
    <p>💨 Wind: {data.wind.speed} km/h</p>
  </div>
)}

      {loading && <p>Loading...</p>}
{error && <p style={{color:"red"}}>{error}</p>}

<button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>


      <div className="mapouter">
        <div className="gmap_canvas">
        <iframe
  title={`Map of ${data?.city || "India"}`}
  src={`https://maps.google.com/maps?q=${data?.city || "India"}&z=12&output=embed`}
  width="300"
  height="250"
/>

        </div>
      </div>
    </div>
  );
};

export default App;
