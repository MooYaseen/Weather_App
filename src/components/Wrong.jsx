import React, { useContext } from 'react'
import { WeatherCotext } from '../context/WeatherContext'

const Wrong = () => {

    const { fetchData } = useContext(WeatherCotext)


    return (
        <div className='flex mt-10 flex-col gap-8 items-center'>
            <img src="/assets/images/icon-error.svg" alt=""
                className='w-10'
            />
            <h1 className='text-4xl font-semibold font-bricolage'>something went wrong</h1>
            <p className='w-96 text-center text-mycolor-300'>We couldn't connect to the server (API error). please try again in a few moments.</p>
            <button className='cursor-pointer w-fit py-2 px-4 bg-mycolor-800 flex items-center capitalize gap-2 
            rounded-md active:scale-98 active:translate-y-0.5 transition-all duration-200 hover:bg-mycolor-600'
                onClick={() => {
                    fetchData()
                }}
            >
                <img src="/assets/images/two-circular-arrows.png" alt=""
                    className='max-h-4 invert'
                />
                <p>retry</p>
            </button>


        </div>
    )
}

export default Wrong