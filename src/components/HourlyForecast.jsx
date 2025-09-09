import React, { useContext, useEffect, useRef, useState } from 'react'
import { WeatherCotext } from '../context/WeatherContext'

const HourlyForecast = ({ getIcon }) => {

    const { data, dailyData, currentDay, setCurrentDay, hourlyDd, getHourly, merged, } = useContext(WeatherCotext)

    const [showWeek, setShowWeek] = useState(false)


    const specialRef = useRef(null);
    const parentRef = useRef(null);
    useEffect(() => {
        const weekday = new Date().toLocaleDateString('en-us', { weekday: 'long' })
        if (parentRef.current && specialRef.current) {
            if (weekday === currentDay) {
                const top = specialRef.current.offsetTop - parentRef.current.offsetTop;
                parentRef.current.scrollTo({ top: top, behavior: "smooth" });
            }
        }
    }, [hourlyDd, specialRef]);



    return (
        <>

            <div className="relative title flex justify-between items-center mx-1 p-4 pb-0"

            >
                Hourly forecast

                <div className={`units py-1 px-2 flex items-center gap-2 rounded-md bg-mycolor-600 hover:bg-mycolor-600
                    select-none cursor-pointer active:scale-98 active:translate-y-0.5 transition-all duration-200
                    ${((data.error === true || data.length === 0) || currentDay === 'Invalid Date') ? 'h-[32px] w-[99px] justify-end animate-pulse' : ''} `}

                    onClick={() => {
                        setShowWeek(p => p ? false : true)
                    }}
                >
                    <p className=''>{currentDay === 'Invalid Date' ? '' : currentDay}</p>
                    <img src="assets/images/icon-dropdown.svg" alt="dropdown" />
                </div>
                <div className={`week absolute top-10 right-0 bg-mycolor-800 p-2 rounded-lg
                         w-[180px] text-lg gap-1.5 flex flex-col
                         -translate-y-6  border border-mycolor-600 shadow-md shadow-mycolor-800
                         transition-all duration-300
                         ${showWeek ?
                        'opacity-100 translate-y-0 pointer-events-auto' :
                        'opacity-0 -translate-y- pointer-events-none'}
                            `}>

                    {
                        dailyData?.time?.map((el, indx) => {
                            const weekday = new Date(el).toLocaleDateString('en-us', { weekday: 'long' })
                            return (
                                <div key={indx}
                                    className={`option text-base py-2 px-3 rounded-lg 
                                     border hover:border-mycolor-600 
                                    cursor-pointer mb-0.5 select-none
                                    ${weekday === currentDay ?
                                            'bg-mycolor-600 border-mycolor-300'
                                            :
                                            'bg-mycolor-700 hover:bg-mycolor-700 border-mycolor-600'}
                                    `}
                                    onClick={(e) => {
                                        setCurrentDay(e.currentTarget.textContent)
                                        getHourly(merged, indx + 1)
                                        setShowWeek(false)
                                    }}
                                >
                                    {weekday}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div ref={parentRef} className="cards hourly mt-3 max-h-[395px] flex flex-col gap-3 overflow-y-auto px-4">
                {
                    (data.error === true || data.length === 0) ?
                        [...Array(8)].map((_, indx) =>
                        (
                            <div key={indx}
                                className={`hour flex items-center justify-between gap-3 px-2 
                                        rounded-lg border border-mycolor-600 h-[41px] animate-pulse
                             `}>
                                <div className='flex gap-3 items-center'>
                                    <div className='h-7 w-7 bg-mycolor-600 rounded-lg'></div>
                                    <p className='h-7 w-14 bg-mycolor-600 rounded-lg'></p>
                                </div>
                                <div className="temp text-end h-7 w-7 bg-mycolor-600 rounded-lg"></div>
                            </div>
                        ))

                        :

                        hourlyDd.map((el, indx) => {
                            const thishour = new Date().toLocaleTimeString('en-us', { hour: 'numeric' })
                            const matches = thishour === el.hour
                            const weekday = new Date().toLocaleDateString('en-us', { weekday: 'long' })
                            console.log(matches)
                            return (
                                <div key={indx}
                                    ref={matches ? specialRef : null}
                                    className={`hour flex items-center gap-3 px-2 rounded-lg border
                                ${matches && weekday == currentDay ?
                                            `bg-mycolor-600 border-mycolor-300 bg-cover bg-center 
                                            bg-no-repeat bg-[url(/public/assets/images/bg-today-large.svg)]`
                                            :
                                            'bg-mycolor-700 border-mycolor-600'}
                            
                            `}>
                                    <img src={`assets/images/icon-${getIcon(el.code)}.webp`} alt=""
                                        className='w-10'
                                    />
                                    <p
                                        onClick={() => {
                                            console.log(el.hour)
                                        }}
                                    >{el.hour}</p>
                                    <div className="temp grow text-end">{Math.round(el.temp)}°</div>
                                </div>
                            )
                        })
                }
            </div>
        </>
    )
}

export default HourlyForecast