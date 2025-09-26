/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import './App.css'
import Header from './components/Header'
import Wrong from './components/Wrong'
import Page from './components/Page'
import { WeatherCotext } from './context/WeatherContext'

function App() {

  const [data, setData] = useState([]);
  // Egypt Governorates
  const locations = [
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Giza", lat: 31.1117, lon: 30.9396 },
    { name: "Kafr El Sheikh", lat: 31.1063, lon: 30.9420 },
    { name: "Alexandria", lat: 31.2001, lon: 29.9187 },
    { name: "Aswan", lat: 24.0889, lon: 32.8998 },
    { name: "Mansoura", lat: 31.0409, lon: 31.3785 },
    { name: "Port Said", lat: 31.2580, lon: 32.3020 },
    { name: "Suez", lat: 29.9670, lon: 32.5497 },
    { name: "Ismailia", lat: 30.5893, lon: 32.2670 },
    { name: "Sharm El Sheikh", lat: 27.9158, lon: 34.3299 },
    { name: "Hurghada", lat: 27.2579, lon: 33.8127 },
    { name: "Luxor", lat: 25.6872, lon: 32.6396 },
    { name: "Fayoum", lat: 29.3033, lon: 30.8320 },
    { name: "Minya", lat: 28.1122, lon: 30.7485 },
    { name: "Assiut", lat: 27.1825, lon: 31.1853 },
    { name: "Sohag", lat: 26.5574, lon: 31.6945 },
    { name: "Qena", lat: 26.1556, lon: 32.7181 },
    { name: "Damietta", lat: 31.1833, lon: 31.4167 },
    { name: "Matrouh", lat: 31.3547, lon: 27.2579 },
    { name: "Beni Suef", lat: 29.0667, lon: 31.0992 },
    { name: "Beheira", lat: 31.2000, lon: 30.8000 },
    { name: "Gharbia", lat: 30.8000, lon: 31.0000 },
    { name: "Sharqia", lat: 30.6000, lon: 31.5000 },
    { name: "Qalyubia", lat: 30.4000, lon: 31.2000 },
    { name: "North Sinai", lat: 31.0000, lon: 33.0000 },
    { name: "South Sinai", lat: 28.0000, lon: 34.0000 },
    { name: "Red Sea", lat: 26.0000, lon: 33.0000 },
    { name: "New Valley", lat: 25.0000, lon: 30.0000 },
    { name: "New Cairo", lat: 30.0330, lon: 31.5204 },
    { name: "6th of October", lat: 29.9833, lon: 30.9333 },
  ];


  // >>>>>>>> All City 
  const allCity = locations.map(x => x.name)
  // >>>>>>>> Cairo by defualt 
  const [city, setCity] = useState(locations[0])
  // Units >>>>> metric and imperial
  const [metric, setMetric] = useState(true)


  const today = new Date()
  // GET day name
  //? example to learn
  // console.log(today.toLocaleDateString('en-us', { weekday: 'short' }))
  const todayDateFormat = today.toLocaleDateString('en-us', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
  const todayHour = today.toLocaleString('en-us', { hour: 'numeric' })


  const [dailyData, setDailyData] = useState([])
  const [hourlyData, setHourlyData] = useState([])
  const [hourlyTemp, setHourlyTemp] = useState([])
  const [hourlyTime, setHourlyTime] = useState([])
  const [hourlyCode, setHourlyCode] = useState([])




  const [hourlyDd, setHourlyDd] = useState([])

  // To filter merged due to current-checked day
  const getHourly = (arr, d) => {
    setHourlyDd(arr.filter((x, i) => i >= 24 * (d - 1) && i < 24 * d))
  }




  const [merged, setMerged] = useState([])

  useEffect(() => {
    setDailyData(data.daily)
    setHourlyData(data.hourly)
    setHourlyTemp(data.hourly?.temperature_2m)
    setHourlyTime(data.hourly?.time)
    setHourlyCode(data.hourly?.weather_code)
    if (hourlyCode && hourlyTemp && hourlyTime) {
      // all temp , time and code
      setMerged(
        hourlyTime.map((hour, i) => ({
          hour: new Date(hour).toLocaleTimeString('en-US', { hour: "numeric", minute: undefined, hour12: true }),
          temp: hourlyTemp[i],
          code: hourlyCode[i]
        }))
      )
    }
  }, [data, data.daily, dailyData])



  // Get today hourly forecast
  useEffect(() => {
    getHourly(merged, 1)
  }, [merged])




  const [currentDay, setCurrentDay] = useState('')

  useEffect(() => {
    setCurrentDay(new Date().toLocaleDateString('en-us', { weekday: 'long' }))
    console.log(currentDay)
  }, [data, data.daily])

  const fetchData = async () => {
    try {
      const { name, lat, lon } = city;
      const res = await fetch(
        metric
          ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&timezone=Africa%2FCairo&utm_source=chatgpt.com`
          : `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&timezone=Africa%2FCairo&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&utm_source=chatgpt.com`
      );
      const json = await res.json();
      setData({ name, ...json });


    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };




  useEffect(() => {

    fetchData();
  }, [metric, city]);



  return (
    <WeatherCotext.Provider value={{
      locations,
      data, dailyData, getHourly, hourlyDd,
      merged, setMerged,
      currentDay, setCurrentDay,
      allCity, city, setCity,
      todayDateFormat, todayHour,
      metric, setMetric, fetchData
    }} >
      <main className='w-full min-h-dvh bg-mycolor-900 text-mycolor-0 font-dm'>
        <div className='container lg:container mx-auto max-w-[90%] xl:max-w-[1200px] 2xl:max-w-[1440px] px-[10px] md:px-0 h-full'>
          <Header />
          {data.error ?
            <Wrong />
            :
            <Page />
          }
        </div>
      </main>
    </WeatherCotext.Provider>
  )
}

export default App
