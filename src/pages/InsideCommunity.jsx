import React,{ useContext, useEffect, useState } from 'react'
import VI from "../assets/VictoriaIsland.png"
import FloorPlans from '../components/FloorPlans'
import axios from 'axios'
import { URL, IF } from '../url'
import Loader from "../components/Loader"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

const InsideCommunity = () => {
  const [community, setCommunity] = useState([])
  const {id: communityId} = useParams()
//   const submarketId = useParams().id
//   const [subMarket,setSubMarket]=useState({})
//   const {user}=useContext(UserContext)

  const fetchSubMarket = async()=>{
    try{

      const accessToken = localStorage.getItem("access_token")


      if(!accessToken){
        // Handle the case where the access token is not available
    console.error('Access token not found')
      }

      const res= await axios.get(URL+"/api/communities/"+communityId,  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log(res.data)
      setCommunity(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchSubMarket()

  },[communityId])
console.log("community",community)


  return (
    <div>
        
        <p className='text-4xl font-medium mt-8 text-center text-green-700'>Welcome to {community.name}</p>
        <img src={community?.photo} alt='' className='rounded-xl w-[600px] h-[400px] mx-auto mt-16'/>
        <p className='text-3xl text-green-800 mt-8 text-center'>Select Your FLoor Plans Below </p>
        {/* <div className='flex justify-evenly max-w-6xl mx-auto mt-9 items-center'>
            <p>Loreem Ipsum has been the industry's standard <br/> dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen <br /> book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <img src={VI} alt='' className='rounded-xl w-[600px] h-[300px] '/>
        </div> */}

        <div className=' justify-evenly max-w-6xl mx-auto mt-9 items-center mb-12'>
            <p className='text-center'>{community.description}</p>
         
        </div>
        {/* <FloorPlans/> */}
        
    </div>
  )
}

export default InsideCommunity