import React from 'react'
import InnerCommunity from '../components/InnerCommunity'
import Sidebar from '../components/Sidebar'

const CreateCommunity = () => {
  return (
    <div className='flex'>
          <Sidebar/>
          <InnerCommunity/>
    </div>
  )
}

export default CreateCommunity