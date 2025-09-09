import TodayWeather from './TodayWeather';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';

const Content = () => {
    const weatherMap = {
        'sunny': [0],
        'partly-cloudy': [1, 2],
        'overcast': [3],
        'fog': [45, 48],
        'drizzle': [51, 53, 55, 56, 57],
        'rain': [61, 63, 65, 66, 67, 80, 81, 82],
        'snow': [71, 73, 75, 77, 85, 86],
        'storm': [95, 96, 99],
    };

    // Getting icon based on Weather Code
    const getIcon = (code) => {
        for (const [icon, codes] of Object.entries(weatherMap)) {
            if (codes.includes(code)) {
                return icon
            }
        }
        return 'unknown'
    }


    return (
        <main className='grid pt-5 pb-2
         grid-rows-[auto_auto] grid-cols-1 gap-y-6
         lg:grid-cols-3 lg:gap-6 lg:grid-rows-1
        '>

            {/* First-Left col (with 2 main row) */}
            <div className="flex flex-col gap-4 row-start-1 left lg:col-start-1 lg:col-end-3">
                {/* first-top row - 2 rows */}
                <TodayWeather getIcon={getIcon} />
                {/* Second-bottom row */}
                <DailyForecast getIcon={getIcon} />
            </div>

            {/* Second-Right col */}
            <div className="bg-mycolor-800 pb-5 rounded-[20px] row-start-2 right lg:col-start-3 lg:row-start-1">
                <HourlyForecast getIcon={getIcon} />
            </div>
        </main>
    )
}

export default Content