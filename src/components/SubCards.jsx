import React from 'react'
import VI from "../assets/VictoriaIsland.png"
import {IF, URL} from '../url'

const SubCards = ({submarket}) => {
  console.log(submarket)
  return (
    <div className='relative mt-6'>
   
    <img src={IF+submarket?.photo}  alt='' className='w-[250px] h-[200px] object-cover rounded-3xl brightness-75'/>
    <div class="absolute top-24 flex w-full">
    <p className='text-white absolute font-medium text-xl ml-6'>{submarket.name}</p>
  </div>
    </div>
  )
}

export default SubCards