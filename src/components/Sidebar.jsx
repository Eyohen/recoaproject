import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='border h-screen w-[16%]'>
       <Link to="/adminpage"><p className='text-green-800 text-2xl font-bold text-center py-2'>Admin</p></Link>

    <div className='text-center mt-6 space-y-6'>
       <Link to={'/adminpage'}><p>Dashboard</p></Link>
       <Link to={'/createtenant'}><p className='mt-6'>Tenant</p></Link>
       <Link to={'/createunittype'}><p className='mt-6'>Units</p></Link>
       <Link to={'/createcommunity'}><p className='mt-6'>Community</p></Link>
       <Link to={'/createsubmarket'}><p className='mt-6'>Submarket</p></Link>
     
      
      
    
       </div>
        
        
    </div>
  )
}

export default Sidebar