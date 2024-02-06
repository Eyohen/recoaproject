import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Reserve = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [organization, setOrganization] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [unitType, setUnitType] = useState("")
  return (
    <div className='px-32'>
        <Navbar/>
        <div className='border-2 border-[#50C878] p-16'>
        <p className='text-[#50C878] text-center text-lg'>SECURE A SPACE</p>
        <div className='grid grid-col-2 gap-x-9 gap-y-6'>
            <div className='flex gap-x-12 mt-6 items-center justify-center'>
        <input onChange={(e)=>setFirstName(e.target.value)} value={name} type="text" placeholder='First Name' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        <input onChange={(e)=>setLastName(e.target.value)} value={name} type="text" placeholder='Last Name' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        </div>
        <div className='flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-12 mt-6 items-center justify-center'>
        <input onChange={(e)=>setFirstName(e.target.value)} value={name} type="text" placeholder='Organization' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        <input onChange={(e)=>setOrganization(e.target.value)} value={name} type="text" placeholder='Email' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        </div>

        <div className='flex gap-x-12 mt-6 items-center justify-center'>
        <input onChange={(e)=>setEmail(e.target.value)} value={name} type="text" placeholder='Telephone' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        <input onChange={(e)=>setPhone(e.target.value)} value={name} type="text" placeholder='Unit Type' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        </div>

        <button className='bg-[#50C878] text-white py-2'>RESERVE</button>
        </div>

        </div>
    </div>
  )
}

export default Reserve