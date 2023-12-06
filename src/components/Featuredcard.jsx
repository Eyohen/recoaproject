import React from 'react'
import VI from "../assets/VictoriaIsland.png"
import { Link } from 'react-router-dom'
import {IF, URL} from '../url'


const Featuredcard = ({estate}) => {
  console.log(estate)

  return (
    // <Link to={'/recoa'}>
    <div className='relative mt-6'>
   {/* <div class="absolute top-6 flex w-full">
    <p className='text-white absolute font-medium text-md ml-20'>Now Pre-leasing</p>
  </div> */}
    <img src={IF+estate?.photo} alt='' className='w-[250px] h-[200px] object-cover rounded-3xl brightness-75'/>
      <div class="absolute top-6 flex w-full">
    <p className='text-white absolute font-medium text-md ml-20'>{estate.status}</p>
  </div> 
    <div class="absolute top-36 flex w-full">
    <p className='text-white absolute font-medium text-2xl ml-2'>{estate.name}</p>
  </div>
   
    </div>
    // </Link>
  )
}

export default Featuredcard