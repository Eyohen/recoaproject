import React from 'react'

const CompanyCard = ({company}) => {
  return (
    <div className='flex flex-col items-center '>
    <div className='bg-[#50C878] text-white text-center text-lg font-bold px-4 py-6 w-[200px]'>{company.tenant}</div>
    </div>
  )
}

export default CompanyCard