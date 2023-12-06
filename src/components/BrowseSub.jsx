import React from 'react'
import VI from "../assets/VictoriaIsland.png"
import SubCards from './SubCards'

const BrowseSub = () => {
  return (
    <div className='border-green-700 border-2 p-6 rounded-3xl max-w-6xl mx-auto mt-10'>
        <p className='text-green-800 text-3xl text-center mt-3 '>Browse Submarkets</p>
        <div className='flex space-x-3'>
        <SubCards/>
        <SubCards/>
        <SubCards/>
        <SubCards/>
        <SubCards/>
        </div>
       
      
      
    </div>
  )
}

export default BrowseSub