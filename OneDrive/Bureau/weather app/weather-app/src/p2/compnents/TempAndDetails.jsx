import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
const TempAndDetails = ({weather: {
  details, icon, temp, temp_min, temp_max, humidity, speed, sunrise, sunset,feels_like, 
}, units,
}) => {

  const verticalDetials =[
    {id: 1,
    Icon: FaThermometerEmpty,
    title: "Real Feel",
    value: `${feels_like.tofixed()}°`
    } ,
    {id: 2,
      Icon: BiSolidDropletHalf ,
      title: "Humidity",
      value: `${humidity.tofixed()}%`
    } ,
    {id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.tofixed()} ${ units === 'matric'? 'Km/h' : 'm/s'}`
    }, 
  ]

  const horizontalDetails = [

    {id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
      } ,
      {id: 2,
        Icon: GiSunset ,
        title: "Sunset",
        value: sunset,
      } ,
      {id: 3,
        Icon: MdKeyboardArrowUp,
        title: "High",
        value: `${temp_max.tofixed()}°`
      }, 
      {id: 4,
        Icon: MdKeyboardArrowDown,
        title: "Low",
        value:`${temp_min.tofixed()}°`
      }, 
  ]
  return (
 <div>
    <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
      <p>{details}</p>
    </div>


    <div className="flex flex-row justify-between py-3">
        <img src={icon} alt="weather-icon"
        className="w-20"/>
        <p className="text-5xl">{`${temp.tofixed()}`}</p>

        <div className="flex flex-col items-start justify-center">
           {verticalDetials.map(({id, Icon, title, value}) => {
            return ( //remember to add next time 3shen ybyno 
              <div 
              key={id} 
              className="flex font-light text-sm items-center justify-center">
                <Icon size={18} className="mr-1"/>
                {title}
                <span className="font-medium ml-1">{value}</span>
              </div>
            )})}
          </div>

    </div>


    <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
      
      {
        horizontalDetails.map(({id, Icon, title, value}) => {
          return (
            <div key={id} className="flex flex-row items-center">
            <Icon size={30} className="mr-1"/>
                <p className="font-light ml-1">
                  {title}
                  <span className="font-medium ml-1">{value}</span>
                </p>
            </div>
          )})}
    </div>

</div> 
  )
}

export default TempAndDetails
