import React, { useContext, useRef, useState } from 'react'
import { WeatherCotext } from '../context/WeatherContext'

const Landing = () => {

    const { allCity, city, setCity, locations } = useContext(WeatherCotext)

    const searchLabel = useRef(null)

    const [showCityList, setShowCityList] = useState(false)
    const [searchWord, setSearchWord] = useState('')

    const [searchIndex, setSearchIndex] = useState(0)

    const searchInput = useRef(null)


    return (
        <div className='flex flex-col items-center mt-6 gap-6'>
            <h1 className='font-bricolage text-4xl text-center px-26 md:px-0 font-semibold'>
                How's the sky looking today?
            </h1>
            <div className="search flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <label htmlFor="city" className='relative'>
                    <input ref={searchInput} type="search" name="search" id="city" placeholder='Search for a place...'
                        className='bg-mycolor-800 py-3 md:py-2 px-4 pl-12 rounded-lg
                        w-full md:w-[350px] focus:inset-ring-2  focus:inset-ring-mycolor-900 font-dm hover:bg-mycolor-600
                         focus:ring-2 focus:outline-0
                         focus:ring-mycolor-200'

                        onFocus={() => {
                            setShowCityList(true)
                        }}

                        onBlur={() => {
                            setTimeout(() => {
                                setShowCityList(false)
                            }, 200);
                        }}

                        onChange={(e) => {
                            setSearchWord(e.currentTarget.value)
                        }}
                    />
                    <div className={`select-city absolute top-12 bg-mycolor-800 p-2 rounded-lg
                        w-full md:w-[350px] text-lg
                        border border-mycolor-300 shadow-xl transition-all duration-300
                        focus:opacity-100  focus:translate-y-0 focus:pointer-events-auto
                        max-h-60 overflow-y-auto z-[200]
                        ${showCityList ?
                            'opacity-100  translate-y-0 pointer-events-auto' :
                            'opacity-0 -translate-y-6 pointer-events-none'}
                    `}>
                        {allCity
                            // first map to get each city as obj {name:'', indx:''}
                            .map((x, i) => ({ name: x, index: i }))
                            // second Filtering by props (name & index)  NOT values (x,i)= to match search word
                            .filter(obj => obj.name.toLowerCase().includes(searchWord.toLowerCase()))
                            // third map filtered cities to create DOM element
                            .map(el => {
                                return (
                                    <button
                                        key={el.index}
                                        onClick={() => {
                                            setShowCityList(false)
                                            setSearchIndex(el.index)
                                            searchInput.current.value = el.name
                                        }
                                        }
                                        className={` ${city.name === el.name ? 'bg-mycolor-700 border-mycolor-300' : 'border-transparent'}
                                        block w-full text-start option py-1 px-2 rounded-lg
                                        hover:bg-mycolor-700 border  hover:border-mycolor-600
                                        cursor-pointer mb-0.5`}
                                    >
                                        {el.name}
                                    </button>
                                )
                            })
                        }


                    </div>
                    <img src="assets/images/icon-search.svg" alt=""
                        className='absolute top-1/2 left-4 -translate-y-1/2'
                    />
                </label>
                <button className='py-3 md:py-2 px-4 rounded-lg  bg-myblue-500 cursor-pointer
                active:scale-98 active:translate-y-0.5 transition-all duration-200
                hover:bg-myblue-700
                hover:ring-myblue-700
                active:ring-myblue-700
                focus:outline-3 focus:outline-mycolor-900
                focus:ring-4 focus:ring-myblue-500'

                    onClick={() => {
                        setCity(locations[searchIndex])
                        searchInput.current.value = ''
                        setSearchWord('')
                    }}

                >
                    Search
                </button>
            </div >
        </div >
    )
}

export default Landing