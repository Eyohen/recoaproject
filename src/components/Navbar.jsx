import React,{ useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { IF, URL } from "../url"

const Navbar = () => {

 
  const {user}=useContext(UserContext)
 


  
  return (
    <div className='h-12 items-center'>
    <div className='flex justify-between p-2 '>
    <p className='text-green-700 font-bold text-3xl'>Recoa</p>
    <div className='flex space-x-6'>
    <p className='text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5' >About us</p>
    <Link to={user?'/findapartment':"/clientlogin" }><p className='text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5'>Find your Apartment</p></Link>
    <p className='text-green-700 text-lg font-medium hover:bg-green-800 hover:text-white hover:rounded-full hover:px-1.5'>Communities</p>
    </div>



    
    </div>
</div>
  )
}

export default Navbar