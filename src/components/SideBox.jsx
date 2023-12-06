import React from 'react'

const SideBox = () => {
  return (
    <div className='flex space-x-4 items-center bg-green-100 rounded-2xl'>
        <img src='https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=' alt='' className='w-[35%] h-32 object-cover rounded-xl' />
        <div>
            <p className='text-green-800 font-bold text-xl text-left'>Recoa Square</p>
            <p className='text-green-800 font-light text-lg text-left'>Victoria Island</p>
            <p className='text-green-800 text-sm font-medium text-left'>425 Units </p>
            <p className='text-green-800 text-sm font-medium text-left'>$7,500/annum</p>
            <p className='text-green-800 text-sm font-medium text-left'>June 2024</p>
        </div>
    </div>
  )
}

export default SideBox