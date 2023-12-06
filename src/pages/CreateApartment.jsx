import React from 'react'
import InnerApartment from '../components/InnerApartment'
import Sidebar from '../components/Sidebar'

const CreateApartment = () => {
  return (
    <div className='flex'>
          <Sidebar/>
          <InnerApartment/>
    </div>
  )
}

export default CreateApartment