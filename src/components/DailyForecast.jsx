import React, { useContext } from 'react'
import { WeatherCotext } from '../context/WeatherContext'

const DailyForecast = ({ getIcon }) => {


    const { data, dailyData, } = useContext(WeatherCotext)

    return (
        <>
            <div className="days">
                <div className="days-title mb-3 px-1">
                    Daily forecast
                </div>
                <div className="cards grid grid-cols-3 md:grid-cols-7 gap-3 md:h-[130px] ">
                    {(data.error === true || data.length === 0) ?
                        [...Array(7)].map((_, indx) =>
                        (
                            <div key={indx}
                                className='flex flex-col p-3 items-center 
                            rounded-lg border border-mycolor-600 bg-mycolor-800
                            justify-between
                            '>
                                <h4 className='text-base text-mycolor-0 font-semibold h-[24px] w-full
                                     bg-mycolor-600 rounded-lg animate-pulse'></h4>
                                <div className='w-[45px] h-[45px] bg-mycolor-600 rounded-lg animate-pulse'>

                                </div>
                                <div className='text-sm w-full flex justify-between'>
                                    <div className="day h-[22px] w-[22px] bg-mycolor-600 rounded-sm animate-pulse"></div>
                                    <div className="night h-[22px] w-[22px] bg-mycolor-600 rounded-sm animate-pulse"></div>
                                </div>
                            </div>
                        ))
                        :
                        dailyData?.time?.map((el, indx) => (
                            <div key={indx}
                                className='flex flex-col p-3 items-center gap-2 md:gap-0
                                 rounded-lg border border-mycolor-600 bg-mycolor-800
                                 '>
                                <h4 className='text-base text-mycolor-0 font-semibold'>{new Date(el).toLocaleDateString('en-us', { weekday: 'short' })}</h4>
                                <img src={`/assets/images/icon-${getIcon(dailyData.weather_code[indx])}.webp`}
                                    alt={getIcon(dailyData.weather_code[indx])}
                                    className='w-16'
                                />
                                <div className='text-sm w-full flex justify-between'>
                                    <div className="day">{`${Math.round(dailyData.temperature_2m_max[indx])}°`}</div>
                                    <div className="night">{`${Math.round(dailyData.temperature_2m_min[indx])}°`}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default DailyForecast