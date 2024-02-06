import React,{ useContext, useEffect, useState }  from 'react'
import VI from "../assets/VictoriaIsland.png"
import SubCards from './SubCards'
import { Link, useLocation } from "react-router-dom"
import axios from 'axios'
import {IF, URL } from '../url'


const BrowseSub = () => {
  const [subMarkets,setSubMarkets] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [noResults,setNoResults] = useState([])


  const fetchSubMarkets = async () => {
    setIsLoading(true)
    try{
      const res = await axios.get(URL+"/api/submarkets/")
      //console.log(res.data)
      setSubMarkets(res.data)
      // console.log(res.data)
      if(res.data.length === 0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      
      setIsLoading(false)
      
    }
    catch(err){
      console.log(err)
      setIsLoading(true)
    }
  }

  useEffect(()=>{
    fetchSubMarkets()

  },[])

  return (
    <div className='border-green-700 border-2 p-6 rounded-3xl max-w-6xl mx-auto mt-10'>
        <p className='text-green-800 text-3xl text-center mt-3 '>Browse Submarkets</p>
        <div className='flex space-x-3 md:flex-row flex-col justify-center items-center'>
        {subMarkets.map((submarket) => ( <>
       <Link to={`/recoa/${submarket._id}`}>
           <SubCards submarket={submarket} key={submarket._id}/>
           </Link>
           </>
       ))}

        </div>
       
      
      
    </div>
  )
}

export default BrowseSub

// import React,{ useContext, useEffect, useState } from 'react'
// import Featuredcard from './Featuredcard'
// import {IF, URL } from '../url'
// import axios from 'axios'
// import { Link, useLocation } from "react-router-dom"
// // import { UserContext } from "../context/UserContext"



// const Featured = () => {
//   const {search}=useLocation()
//   // console.log(search)
//   const [estates,setEstates]=useState([])
//   const [noResults,setNoResults]=useState(false)
//   const [loader,setLoader]=useState(false)
//   // const {user}=useContext(UserContext)



  // const fetchPosts = async () => {
  //   setLoader(true)
  //   try{
  //     const res = await axios.get(URL+"/api/estates/"+search)
  //     //console.log(res.data)
  //     setEstates(res.data)
  //     console.log(res.data)
  //     if(res.data.length === 0){
  //       setNoResults(true)
  //     }
  //     else{
  //       setNoResults(false)
  //     }
  //     setLoader(false)
      
  //   }
  //   catch(err){
  //     console.log(err)
  //     setLoader(true)
  //   }
  // }

  // useEffect(()=>{
  //   fetchPosts()

  // },[search])
  
//   return (
//     <div className='bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10'>
//     <p className='text-white text-3xl text-center mt-3 font-medium '>Featured Properties</p>
//     <div className='flex space-x-3 md:flex-row flex-col justify-center items-center overflow-x-scroll'>
//       {estates.map((estate) => ( <>
//       <Link to={`/recoa/${estate._id}`}>
//           <Featuredcard estate={estate} key={estate._id}/>
//           </Link>
//           </>
//       ))}
    
//     </div> 
  
// </div>
//   )
// }

// export default Featured