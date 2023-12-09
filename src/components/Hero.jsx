import React from 'react'
import Home from '../assets/Homepage.png'

const Hero = () => {
  return (
    <div style={{
      backgroundImage: `url(${Home})`,
      backgroundSize:'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '500px',
      }}>
        <div className='justify-center items-center flex flex-col'>
        <p className='text-white font-bold text-2xl md:text-4xl text-center justify-center mt-16'>Find Your New Home</p>
        <input placeholder='Enter a location' className='sm:w-[500px] md:w-[530px] h-9 rounded-lg mt-3 text-green-600' />
        <p className='text-white text-md md:text-lg text-center justify-center mt-2'>FIND RENTAL APARTMENT HOMES IN THE BUSINESS DISTRICTS OF LAGOS</p>
        </div>
        {/* <img src={Home} alt='' className='w-full h-[500px] object-cover brightness-75'/> */}
      
        {/* <div class="absolute top-[200px] left-[550px] w-full">
        <p className='text-white  font-bold text-4xl ml-20'>Find Your New Home</p>
    <input placeholder='Enter a location' className='mx-auto w-[530px] h-9 rounded-lg mt-12 text-green-600' />
    <p className='text-white text-'>FIND RENTAL APARTMENT HOMES IN THE BUSINESS DISTRICTS OF LAGOS</p>
 </div> */}
  
    </div>
  )
}

export default Hero