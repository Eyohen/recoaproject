import React from 'react'
import { URL, IF  } from '../url'

const SideBox = ({item}) => {
  return (
    <div className='flex space-x-4 items-center bg-green-100 rounded-2xl p-1'>
        {/* <img src='https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=' alt='' className='w-[35%] h-32 object-cover rounded-xl' /> */}
        <img src={IF+item.photo[0]} alt='' className='w-[35%] h-32 object-cover rounded-xl' />
        <div>
            <p className='text-green-800 font-bold text-xl text-left'>{item.roomName}</p>
            <p className='text-green-800 font-light text-lg text-left'>{item.location}</p>
            <p className='text-green-800 text-sm font-medium text-left'>{item.floorsAvailable} Units </p>
            <p className='text-green-800 text-sm font-medium text-left'>${item.price}/annum</p>
            <p className='text-green-800 text-sm font-medium text-left'>{item.createdAt}</p>
        </div>
    </div>
  )
}

export default SideBox