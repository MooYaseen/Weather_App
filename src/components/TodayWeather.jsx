import React, { useContext } from 'react'
import { WeatherCotext } from '../context/WeatherContext'

const TodayWeather = ({ getIcon }) => {
    // Access weather data and formatted date from WeatherContext
    const { data, todayDateFormat } = useContext(WeatherCotext)

    // Define main weather parameters for today (feels like, humidity, wind, precipitation)
    const currentParameters = [
        { title: 'feels like', value: data.current?.apparent_temperature, unit: data.current_units?.apparent_temperature },
        { title: 'Humidity', value: data.current?.relative_humidity_2m, unit: data.current_units?.relative_humidity_2m },
        { title: 'Wind', value: data.current?.wind_speed_10m, unit: data.current_units?.wind_speed_10m },
        { title: 'Precipitation', value: data.current?.precipitation, unit: data.current_units?.precipitation }
    ]

    return (
        <>
            {/* Main container for displaying today's weather */}
            <div
                className={`today rounded-[20px] p-5 min-h-[190px] flex justify-between items-center bg-bottom gap-4
                    ${data.error === true || data.length === 0
                        ? "bg-mycolor-800"
                        : "bg-[url(public/assets/images/bg-today-small.svg)] md:bg-[url(public/assets/images/bg-today-large.svg)] flex-row flex-wrap"
                    }
                bg-no-repeat bg-cover`}
            >
                {/* Loading or error state */}
                {data.error === true || data.length === 0 ? (
                    <div className="today-icon grow flex flex-col justify-center items-center h-full">
                        <img
                            src="assets/images/icon-loading.svg"
                            alt={data.current?.weather_code}
                            className="w-[70px] animate-pulse"
                        />
                        <p className="text-2xl text-mycolor-200 animate-pulse">Loading...</p>
                    </div>
                ) : (
                    <>
                        {/* City name and current date */}
                        <div className="city-date text-center md:text-start basis-full md:basis-auto">
                            <h2 className="city text-3xl font-semibold mb-2">
                                {data.name}, Egypt
                            </h2>
                            <div className="date text-mycolor-200">{todayDateFormat}</div>
                        </div>

                        {/* Current weather icon */}
                        <div className="today-icon md:grow flex justify-end items-center h-[100px] md:h-full">
                            <img
                                src={`assets/images/icon-${getIcon(data.current?.weather_code)}.webp`}
                                alt={data.current?.weather_code}
                                className="w-[120px] md:w-[100px]"
                            />
                        </div>

                        {/* Current temperature */}
                        <div className="today-temp text-7xl italic font-semibold">
                            {`${parseInt(data.current?.temperature_2m)} °`}
                        </div>
                    </>
                )}
            </div>

            {/* Display additional weather parameters (feels like, humidity, wind, precipitation) */}
            <div className="infos grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
                {currentParameters.map(el => (
                    <div key={el.title}
                        className='flex flex-col px-4 py-2.5 gap-4 rounded-lg border border-mycolor-600 bg-mycolor-800'>
                        {/* Parameter name */}
                        <h4 className='text-sm text-mycolor-300'>{el?.title}</h4>
                        {/* Parameter value or placeholder during loading */}
                        <div className={`text-2xl h-[30px] ${el?.value === undefined ? 'bg-mycolor-600 rounded-lg animate-pulse' : ''}`}>
                            {` ${el?.value === undefined ? '' : el?.value} ${el?.unit === undefined ? '' : el?.unit}`}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TodayWeather
