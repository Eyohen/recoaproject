import React, { useState, useEffect } from 'react'
import VI from "../assets/VictoriaIsland.png"
import { Link } from 'react-router-dom'
import "./Modal.css";
import { HiPlusSmall } from "react-icons/hi2";
import { HiMinusSmall } from "react-icons/hi2";
import {IF, URL} from '../url'
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom'



const Floorcard = ({apartment}) => {
    const [modal, setModal] = useState(false)
    const [count, setCount] = useState(1)
    // const [floorsAvailable, setFloorsAvailable] = useState('')
    // const [price, setPrice] = useState('')
    // const param=useParams().id

    // const fetchProfile = async () => {
    //   try{
    //     const res = await axios.get(URL+"/api/apartments"+param)
    //     setFloorsAvailable(res.data.floorsAvailable)
    //     setPrice(res.data.price)
    //     console.log(res.data.price)
    //   }
    //   catch(err){
    //     console.log(err)
    //  }
    // }

    const toggleModal = () => {
        setModal(!modal)
    }

    const increase = () => {
        setCount(count + 1)
    }

    const decrease = () => {
        setCount(count - 1)
    }

    

    // useEffect(()=>{
    //   fetchProfile()
    // },[param])
    
  

  return (
   
    <div className='relative mt-6'>
 
   {/* <div class="absolute top-6 flex w-full">
    <p className='text-white absolute font-medium text-md ml-20'>Now Pre-leasing</p>
  </div> */}
   <img src={IF+apartment.photo ? IF+apartment.photo : "https://www.svgrepo.com/show/340721/no-image.svg"} alt='' className='w-[450px] h-[250px] object-cover rounded-3xl brightness-75'/>
   
      <div class="absolute top-6 flex w-full space-x-6 justify-center">
    <p className='text-white font-medium text-md '>{apartment.type}</p>
    <p className='text-white font-medium text-md'>{apartment.bathroom} Bath</p>
    <p className='text-white font-medium text-md'>{apartment.size} sq.m</p>
  </div> 
    <div class="absolute top-16 flex w-full justify-center">
      <div>
    <p className='text-white font-medium text-md '>{apartment.roomName}</p>
    <p className='text-white font-medium text-2xl '><span className='text-3xl'>{apartment.floorsAvailable}</span> available</p>
    </div>
  </div>
  <div class="absolute top-32 flex w-full justify-center">
    <button className='bg-white text-green-700 font-medium text-2xl  rounded-full px-2 items-center'>starting at ${apartment.price}/annum</button>
  </div>
  <div class="absolute top-[190px] flex w-full justify-center">
    <button onClick={toggleModal} className='text-white font-medium text-2xl border-2 border-white rounded-full px-2'>Reserve</button>
  </div>

  {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content rounded-xl">
            <p className='text-center text-2xl text-green-700'>Apartment A</p>
            <p className='text-center mt-3'>{apartment.floorsAvailable - count} floors Remaining</p>
            <p  className='text-center mt-3'>Amount: {apartment.price * count}</p>
            <div className='flex space-x-4 items-center justify-center mt-3'>
            <button onClick={decrease} className='bg-green-700 rounded-full px-2'><HiMinusSmall /></button>
            <p>
             {count}
            </p>
            <button onClick={increase} className='bg-green-700 rounded-full px-2'><HiPlusSmall /></button>
            </div>
            {/* <div className='items-center justify-center '> */}
            <button className='bg-green-700 px-2 rounded-full mx-32 mt-6' onClick={toggleModal}>Submit</button>
            {/* </div> */}
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          
          </div>
         
        </div>
      )} 
   
    </div>

  )
}

export default Floorcard