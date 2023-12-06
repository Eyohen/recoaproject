import React from 'react'
import { Link } from 'react-router-dom'
import SideBox from './SideBox'

const FindSide = () => {
  return (
    <div className='border h-screen w-[26%] p-3'>
  

    <div className='text-center mt-6 space-y-3'>
       
    <Link to={'/recoa'}> <SideBox/></Link>
       <SideBox/>
       <SideBox/>
       <SideBox/>

    
       </div>
        
        
    </div>
  )
}

export default FindSide