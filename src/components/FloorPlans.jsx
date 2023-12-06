import React,{ useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Floorcard from './Floorcard'
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../context/UserContext"
// import Loader from '../components/Loader'
import { IF, URL } from "../url"


const FloorPlans = () => {
  const {search}=useLocation()
  // console.log(search)
  const [apartments,setApartments]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res = await axios.get(URL+"/api/apartments/"+search)
      // console.log(res.data)
      setApartments(res.data)
      if(res.data.length===0){
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
    fetchPosts()

  },[search])

  return (
    <div className='bg-green-800 p-6 rounded-3xl max-w-6xl mx-auto mt-10'>
    <p className='text-white text-3xl text-center mt-3 font-medium '>Floor Plans</p>
    {/* {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts2 key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div> */}

<div className='flex space-x-3 overflow-x-scroll'>
    {apartments.map((apartment) => (
      <>
      {/* <Link to={user?`/posts/post/${available._id}`:"/login"}> */}
      
         <Floorcard key={apartment._id} apartment={apartment}/>
      
      {/* </Link> */}
      </>
    ))}

    </div>


 
   
  
  
</div>
  )
}

export default FloorPlans