/* eslint-disable no-undef */
import { useState } from 'react'
// import apiKey from './apiKey'

import notFound from '../src/assets/not-found.png'
import cloud from '../src/assets/cloud.png'
import clear from '../src/assets/clear.png'
import rain from '../src/assets/rain.png'
import snow from '../src/assets/snow.png'
import haze from '../src/assets/mist.png'
import './App.css'


function App() {

  let keys = process.env.API_KEY;

  // html
  const imageStatus = document.getElementsByClassName('image-status')[0];

  let [city, setCity] = useState('')
  let [temp, setTemp] = useState(0);
  let [humidity, setHumidity] = useState(0);
  let [wind, setWind] = useState(0)
  let [description, setDescription] = useState('')
  const changecity = (e) => {setCity(e.target.value)}

  const keyDown = (e) => {
    if(e.key == 'Enter') {
      fetchData()
    }
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }


  const fetchData = async () => {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keys}`
    );
    const data = await response.json();

    if (data.cod == '404') {
      setDescription('')
      setTemp(0)
      setHumidity(0);
      setWind(0)
      imageStatus.src = notFound
      return
    }
    switch(data.weather[0].main){
      case 'Clear':
        imageStatus.src = clear;
        break;

      case 'Rain':
        imageStatus.src = rain;
        break;

      case 'Snow':
        imageStatus.src = snow;
        break;

      case 'Clouds':
        imageStatus.src = cloud;
        break;

      case 'Haze':
        imageStatus.src =haze;
                    break;

      default : ""
    }
    setDescription(titleCase(data.weather[0].description))
    setTemp(data.main.temp)
    setHumidity(data.main.humidity);
    setWind(data.wind.speed)
  };

  return (
    <>
      <div className="search">
      <input type="text" className='input' placeholder='Search Location' onChange={changecity} onKeyDown={keyDown}/>
      <i className='icon-search bx bx-search-alt' onClick={fetchData}></i>
      </div>
      <div className="show">
        <div className="status">
        <img src={notFound} alt="Location Not Found" className='image-status' />
        <h1><span> {temp} </span><sup> &#8451;</sup></h1>
        <h3> {description} </h3>
        </div>
        <div className="main-status">
          <div className="humidity">
          <i className='bx bx-water'></i>
          <div className="info">
            <p><span> {humidity} </span> %</p>
          <p>Humidity</p>
          </div>
          </div>
          <div className="wind">
          <i className='bx bx-wind'></i>
          <div className="info">
            <p><span> {wind} </span> m/s</p>
            <p>Wind</p>
          </div>
          </div>
        </div>
      </div>
    </>
     
  )
}

export default App
{/* <div>
      <h1>Weather App</h1>

      <input type="text" onChange={changecity} style={{marginRight:'40px'}}/>
      <button onClick={fetchData}>Seacrh</button>
      <h3>Temp = {temp} </h3>
      <h3>Wind = {wind} </h3>
      <h3>Weather = {weather} </h3>
    </div> */}
    