import { useContext, useEffect, useState } from "react"
// import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { SlArrowLeft } from "react-icons/sl";


const EditApartment = () => {

    const apartmentId=useParams().id
    const {user}=useContext(UserContext)
    const navigate=useNavigate()
    const [roomName,setRoomName]=useState("")
    const [floorsAvailable,setFloorsAvailable]=useState("")
    const [description,setDescription]=useState("")
    const [bedroom,setBedroom]=useState("")
    const [bathroom,setBathroom]=useState("")
    const [price,setPrice]=useState("")
    const [size,setSize]=useState("")
    const [type,setType]=useState("")
    const [location,setLocation]=useState("")
    
    const [file,setFile]=useState(null)
    

    const fetchApartments = async()=>{
      try{
        const accessToken = localStorage.getItem("access_token");

        if(!accessToken){
              // Handle the case where the access token is not available
          console.error('Access token not found')
        }

        const res=await axios.get(URL+"/api/apartments/"+apartmentId,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setRoomName(res.data.roomName)
        setFloorsAvailable(res.data.floorsAvailable)
        setDescription(res.data.description)
        setFile(res.data.photo)
       
        setBedroom(res.data.bedroom)
        setBathroom(res.data.bathroom)
        setPrice(res.data.price)
        setSize(res.data.size)
        setType(res.data.type)
        setLocation(res.data.location)

      }
      catch(err){
        console.log(err)
      }
    }

    const handleUpdate=async (e)=>{
      e.preventDefault()
      const apartment = {
        roomName,
        description,
        // username:user.username,
        // userId:user._id,
        // categories:cats
        bedroom,
        size,
        type,
        location,
        price,
        bathroom

      }

      if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        apartment.photo=filename
        // console.log(data)
        //img upload
        try{
          const accessToken = localStorage.getItem("access_token");

          if(!accessToken){
                // Handle the case where the access token is not available
            console.error('Access token not found')
          }

          const imgUpload = await axios.post(URL+"/api/upload",data,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          // console.log(imgUpload.data)
        }
        catch(err){
          console.log(err)
        }
      }
      //post upload
     
      try{
        const accessToken = localStorage.getItem("access_token");

        if(!accessToken){
              // Handle the case where the access token is not available
          console.error('Access token not found')
        }

        const res=await axios.put(URL+"/api/apartments/"+apartmentId,apartment,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        navigate("/apartmentscreated")
        // console.log(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

    

    useEffect(()=>{
      fetchApartments()
    },[apartmentId])



  return (
    <div>
        {/* <Navbar/> */}
        <div className='px-6 md:px-[200px] mt-8'>
            <div onClick={() => navigate(-1)} className="flex items-center space-x-3">
        <SlArrowLeft />
        <h1 className='font-bold md:text-2xl text-xl '>Back</h1>
        </div>
        <h1 className='font-bold md:text-2xl text-xl text-center '>Update an Apartment</h1>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e)=>setRoomName(e.target.value)} value={roomName} type="text" placeholder='Enter Apartment Name' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setFloorsAvailable(e.target.value)} value={floorsAvailable} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setBedroom(e.target.value)} value={bedroom} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setBathroom(e.target.value)} value={bathroom} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setSize(e.target.value)} value={size} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setType(e.target.value)} value={type} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          <input onChange={(e)=>setLocation(e.target.value)} value={location} type="text" placeholder='Enter post title' className='px-4 py-2 border outline-none text-gray-400'/>
          {/* <input onChange={(e)=>setSize(e.target.value)} value={size} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none'/> */}
          <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
              
                
            
            
            </div>
          </div>
          {/* <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={15} cols={30} className='px-4 py-2 border outline-none' placeholder='Enter post description'/> */}
          <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update Apartment</button>
        </form>

        </div>
        {/* <Footer/> */}
    </div>
  )
}

export default EditApartment