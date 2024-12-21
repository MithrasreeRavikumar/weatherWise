import  { useEffect,useRef,useState } from 'react';
import React from 'react'
import './Weather.css'
import searchIcon from '../assets/search1.png';
import sunnyIcon from '../assets/sunny.png';
import drizzleIcon from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity1.png';
import clearIcon from '../assets/clear.png';
import cloudyIcon from '../assets/clouds.png';
import rainyIcon from '../assets/rainy.png';
import snowIcon from '../assets/snow.jpg';
import windIcon from '../assets/wind.png';
export const Weather = () => {
  const inputRef=useRef()
  const [weatherData,setWeatherData]=useState(false);
  const allIcons={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudyIcon,
    "02n":cloudyIcon,
    "03d":cloudyIcon,
    "03n":cloudyIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainyIcon,
    "09n":rainyIcon,
    "10d":rainyIcon,
    "10n":rainyIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }
  const search = async(city)=>{
    if(city===""){
      alert("Enter city name");
      return;
    }
    try{
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response= await fetch(url);
      const data= await response.json();
      console.log('API Key:', process.env.REACT_APP_API_KEY);
      console.log(data);
      if(!response.ok){
        alert(data.message);
        return;
      }
      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || clearIcon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } else {
        console.error('Error fetching data:', data.message);
    }}
    catch(error){
      setWeatherData(false);
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
    search("Canada");
  },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search'/>
            <img src={searchIcon} alt='' onClick={()=>search(inputRef.current.value)}style={{ verticalAlign: 'middle'}} />
        </div>
        {weatherData?<> <img src={weatherData.icon} alt='' className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidityIcon} alt=''/>
            <div>
              <p>{weatherData.humidity}</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={windIcon} alt=''/>
            <div>
              <p>{weatherData.windSpeed}km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div></>:<></>}
       
    </div>
  )
}

