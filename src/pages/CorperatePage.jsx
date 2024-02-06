import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CompanyCard from '../components/CompanyCard'
import { Link } from 'react-router-dom'
import { URL } from '../url'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router-dom'

// const companies = [
//     {
//         _id: 1,
//         name:"Shell Ltd"
//     },
//     {
//         _id: 2,
//         name:"Chevron Ltd"
//     },
//     {
//         _id: 3,
//         name:"ExxonMobil Ltd"
//     },
// ]

const CorperatePage = () => {

    const [companies, setCompanies] = useState([])

    const fetchTenant = async() => {

        try {
            const res = await axios.get(URL+"/api/tenants/")
            setCompanies(res.data)

        } catch (err){
            console.log(err)
        }

    }

    useEffect(() => {
        fetchTenant()
    }, [])



  return (
    <div>
        <Navbar/>
        <p className='text-[#50C878] text-lg text-center mt-9 font-bold'>Corperate Tenants</p>
        <div className='flex flex-col gap-y-6 mt-9'>
            {companies.map((company) => (
                <Link to={`/corperatelogin/${company._id}`}>
                <CompanyCard key={company._id} company={company}/>
                </Link>
            ))}

        </div>
       
      
    </div>
  )
}

export default CorperatePage