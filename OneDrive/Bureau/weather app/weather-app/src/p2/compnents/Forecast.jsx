import React from 'react'

const Forecast = ({title, data}) => {

  return (
    <div>
      <div className="flex item-center justify-start mt-6">
        <p className='font-medium uppercase'>{title}</p>
      </div>
      <hr  className='my-1'/>

      <div className='flex items-center justify-between'>
        {
          data.map((d, index) => {
            return( 
            <div key={index} 
              className='flex flex-col items-center justify-center'>
              <p className='font-light text-sm'>
                {d.title}</p>  
              <img 
              src={d.icon} alt="weather-icon" className="w-20"/>
              <p className='font-medium'>{`${d.temp.tofixed()}°`}</p>
            </div>)
          })}
      </div>
    </div>
  )
}

export default Forecast
