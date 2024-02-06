import React, { useState, useEffect }  from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { URL } from '../url'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router-dom'



const CommunityCard = ({community}) => {
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


// for checking 
// const fetchProfile = async () => {
//   try{
//     const accessToken = localStorage.getItem("access_token")
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"))
//     console.log(typeof currentUser)
//     if(!currentUser){
//       return ;
//     }


//     if(!accessToken){
//       // Handle the case where the access token is not available
//   console.error('Access token not found')
// }

//      const res = await axios.get(URL+"/api/tenants/"+currentUser?._id, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       }
//     })
    
//     console.log(res.data)
//      setData(res.data)
//   }
//   catch(err){
//      console.log(err)
//   }
// }


// useEffect(()=>{
//   fetchProfile()

// },[])



  return (
    <div className='border-2 border-[#50C878] p-6'>
    <p className='text-green-800 text-4xl text-center mt-8'>{community.name}</p>
    <p className='text-center mt-16 px-16'>{community.desc}</p>
      <div className='flex flex-col items-center mt-9'>
        <p className='text-[#50C878] border-2 border-[#50C878] w-[500px] px-4 text-center text-lg'>Preleasing Open to Corporate Tenants</p>
       
       <div className='grid md:grid-cols-2 md:gap-x-9 gap-y-4 text-[rgb(80,200,120)] border-2 border-[#50C878] w-[500px] px-4 mt-4 py-4'> 
       

       {companies.map((company) => (

           <Link to={`/corperatelogin/${company._id}`} >
            <Company key={company._id} company={company}/>
           </Link>
        ))}



       
                 </div>
      
      </div>


      <Link to={'/reserve'}><p className='text-[#50C878] text-lg text-center mt-16 underline'>Join WaitList</p></Link>


      </div>
  )
}


const Company = ({company}) => {
  return (
    <p className='bg-[#50C878] text-white rounded-lg text-center text-lg'>{company.tenant}</p>
  )
}


const Communities = () => {

  // const [companies, setCompanies] = useState([])
  const [communities, setCommunities] = useState([])

  const fetchCommunity = async() => {

    try {
        const res = await axios.get(URL+"/api/communities/")
        setCommunities(res.data)
        console.log("henry",res.data)

    } catch (err){
        console.log(err)
    }

}

useEffect(() => {
    fetchCommunity()
}, [])


  // const fetchTenant = async() => {

  //     try {
  //         const res = await axios.get(URL+"/api/tenants/")
  //         setCompanies(res.data)

  //     } catch (err){
  //         console.log(err)
  //     }

  // }

  // useEffect(() => {
  //     fetchTenant()
  // }, [])


  return (
    <div>
        <Navbar/>
        <div className='flex flex-col gap-y-6'>
        {communities.map((community) => (
         <Link to={`/insidecommunity/${community._id}`} >
             <CommunityCard key={community._id} community={community}/>
             </Link>
        
        ))}
        </div>
      
       
     
      </div>
  )
}

export default Communities