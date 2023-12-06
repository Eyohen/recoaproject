import React from 'react'
import Home from '../assets/Homepage.png'

const Hero = () => {
  return (
    <div className='relative'>
        <img src={Home} alt='' className='w-full h-[500px] object-cover brightness-75'/>
      
        <div class="absolute top-[200px] left-[550px] w-full">
        <p className='text-white absolute font-bold text-4xl ml-20'>Find Your New Home</p>
    <input placeholder='Enter a location' className='mx-auto w-[530px] h-9 rounded-lg mt-12 text-green-600' />
    <p className='text-white text-'>FIND RENTAL APARTMENT HOMES IN THE BUSINESS DISTRICTS OF LAGOS</p>
 </div>
  
    </div>
  )
}

export default Hero