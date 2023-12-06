import React from 'react'
import VI from "../assets/VictoriaIsland.png"

const SubCards = () => {
  return (
    <div className='relative mt-6'>
   
    <img src={VI} alt='' className='w-[250px] h-[200px] object-cover rounded-3xl brightness-75'/>
    <div class="absolute top-24 flex w-full">
    <p className='text-white absolute font-medium text-xl ml-6'>Victoria Island</p>
  </div>
    </div>
  )
}

export default SubCards