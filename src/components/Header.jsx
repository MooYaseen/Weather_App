import React, { useContext, useState } from 'react'
import { WeatherCotext } from '../context/WeatherContext'

const Header = () => {


    const { metric, setMetric } = useContext(WeatherCotext)




    const [unitShow, setUnitShow] = useState(false)




    return (
        <div className='pt-4 flex justify-between'>
            <div className="logo">
                <img src="assets/images/logo.svg" alt="logo" />
            </div>

            <div className='relative z-40 group'>

                <button className="units py-2 px-4 flex items-center gap-2 rounded-md bg-mycolor-800 hover:bg-mycolor-600
            select-none cursor-pointer active:scale-98 active:translate-y-0.5 transition-all duration-200
            focus:ring-2 focus:outline-0
            focus:ring-mycolor-200
            focus:inset-ring-2  focus:inset-ring-mycolor-900"

                    onClick={() => {
                        setUnitShow(prv => prv === false ? true : false)
                    }}

                >
                    <img src="assets/images/icon-units.svg" alt="icon" />
                    <p className=''>Units</p>
                    <img src="assets/images/icon-dropdown.svg" alt="dropdown" />

                </button>



                {/* the hidden card */}
                <div className={`swtich-units absolute z-40  top-12 right-0 bg-mycolor-800 p-2 rounded-lg
                         w-[220px]  text-lg gap-3 flex flex-col
                         border border-mycolor-600 shadow-md shadow-mycolor-800
                         transition-all duration-300 
                         ${unitShow ?
                        'opacity-100 translate-y-0 pointer-events-auto'
                        :
                        'opacity-0 -translate-y-6 pointer-events-none'}
                          `}>

                    <button
                        className=" block switch-title capitalize text-base p-2 rounded-lg hover:bg-mycolor-600
                         cursor-pointer bg-mycolor-700 active:scale-98 transition-all duration-200 "
                        onClick={() => {
                            setMetric(oldmetric => oldmetric === true ? false : true)
                            setUnitShow(false)
                        }}
                    >
                        {`switch to ${metric ? 'imperial' : 'metric'}`}
                    </button>





                    {/* temprature */}
                    <div className="category">


                        <div className="c-title text-sm px-3 mb-1 text-mycolor-300">
                            Temprature
                        </div>


                        <div className={`option text-base
                        py-2 px-3 rounded-lg
                        border border-transparent 
                        mb-1.5 flex justify-between 
                        ${metric && 'bg-mycolor-700'}
                        `}>
                            <p>Celsius (°C)</p>
                            <img src="assets/images/icon-checkmark.svg" alt=""
                                className={metric ? '' : 'hidden'}
                            />
                        </div>

                        <div className={`option text-base
                        py-2 px-3 rounded-lg
                        border border-transparent 
                        mb-1.5 flex justify-between
                        ${!metric && 'bg-mycolor-700'}
                        `}>
                            <p>Fahrenheit (°F)</p>
                            <img src="assets/images/icon-checkmark.svg" alt=""
                                className={!metric ? '' : 'hidden'}
                            />
                        </div>

                    </div>

                    <div className="line h-px w-full bg-mycolor-600"></div>

                    {/* wind speed */}
                    <div className="category">

                        <div className="c-title text-sm px-3 mb-1 text-mycolor-300">
                            Wind Speed
                        </div>


                        <div className={`option text-base
                        py-2 px-3 rounded-lg
                        border border-transparent 
                        mb-1.5 flex justify-between 
                        ${metric && 'bg-mycolor-700'}
                        `}>
                            <p>Km/h</p>
                            <img src="assets/images/icon-checkmark.svg" alt=""
                                className={metric ? '' : 'hidden'}
                            />
                        </div>

                        <div className={`option text-base
                        py-2 px-3 rounded-lg
                        border border-transparent 
                        mb-1.5 flex justify-between
                        ${!metric && 'bg-mycolor-700'}
                        `}>
                            <p>mph</p>
                            <img src="assets/images/icon-checkmark.svg" alt=""
                                className={!metric ? '' : 'hidden'}
                            />
                        </div>

                    </div>

                    <div className="line h-px w-full bg-mycolor-600"></div>

                    {/* Precipitation */}
                    <div className="category">

                        <div className="c-title text-sm px-3 mb-1 text-mycolor-300">
                            Precipitation
                        </div>


                        <div className={`option text-base
                        py-2 px-3 rounded-lg
                        border border-transparent 
                        mb-1.5 flex justify-between 
                        ${metric && 'bg-mycolor-700'}
                        `}>
                            <p>Millimeters (mm)</p>
                            <img src="assets/images/icon-checkmark.svg" alt=""
                                className={metric ? '' : 'hidden'}
                            />
                        </div>

                        <div className={`option text-base
                        py-2 px-3 rounded-lg
                        border border-transparent 
                        mb-1.5 flex justify-between
                        ${!metric && 'bg-mycolor-700'}
                        `}>
                            <p>Inch (in)</p>
                            <img src="assets/images/icon-checkmark.svg" alt=""
                                className={!metric ? '' : 'hidden'}
                            />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Header