import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='border h-screen w-[16%]'>
       <p className='text-green-800 text-2xl font-bold text-center py-2'>Admin</p>

    <div className='text-center mt-6 space-y-6'>
       <Link to={'/adminpage'}><p>Dashboard</p></Link>
       <Link to={'/createapart'}><p className='mt-6'>Apartment</p></Link>
       <Link to={'/createestate'}><p className='mt-6'>Estate</p></Link>
       <p>Settings</p>
      
    
       </div>
        
        
    </div>
  )
}

export default Sidebar