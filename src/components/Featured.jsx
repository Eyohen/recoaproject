import React,{ useContext, useEffect, useState } from 'react'
import Featuredcard from './Featuredcard'
import {IF, URL } from '../url'
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"
// import { UserContext } from "../context/UserContext"



const Featured = () => {
  const {search}=useLocation()
  // console.log(search)
  const [subMarkets,setSubMarkets] = useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  // const {user}=useContext(UserContext)



  const fetchSubMarkets = async () => {
    setLoader(true)
    try{
      const res = await axios.get(URL+"/api/communities/")
      //console.log(res.data)
      setSubMarkets(res.data)
      console.log("featured",res.data)
      if(res.data.length === 0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchSubMarkets()

  },[])
  
  return (
    <div className='bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10'>
    <p className='text-white text-3xl text-center mt-3 font-medium '>Featured Properties</p>
    <div className='flex space-x-3 md:flex-row flex-col justify-center items-center overflow-x-scroll'>
      {subMarkets.map((submarket) => ( <>
      <Link to={`/recoa/${submarket._id}`}>
          <Featuredcard submarket={submarket} key={submarket._id}/>
          </Link>
          </>
      ))}
    
    </div> 
  
</div>
  )
}

export default Featured