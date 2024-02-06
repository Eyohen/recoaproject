import React, { useState, useEffect } from 'react'
import Home from '../assets/Homepage.png'
import axios from 'axios'
import { URL } from '../url';
import Navbar from '../components/Navbar';
import { Link, useNavigate, useParams } from "react-router-dom"

const CorperateLogin = () => {
    const {id: tenantId} = useParams()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedEmail, setSelectedEmail] = useState([])
    const [tenants, setTenants] = useState([])
    const [error,setError]=useState(false)
    const navigate=useNavigate()


    const getTenant = async () => {
      
      
            try {
    
        //       const accessToken = localStorage.getItem("access_token")
    
    
        //       if(!accessToken){
        //         // Handle the case where the access token is not available
        //     console.error('Access token not found')
        //   }
    
              const res =  await axios.get(URL+"/api/tenants/"+tenantId)
              console.log(res.data)
              setTenants(res.data)
            //   console.log(reservation)
            }
            catch(err){
              console.log(err)
            }
        
        } 
        
    
         useEffect(() => {
            getTenant()
         },[tenantId])
    


    const handleLogin = async() => {
        setIsLoading(true); 
        try {
        const res = await axios.post(URL+"/api/tenants/login", {email,password})
        const { access_token } = res.data;
 
      if(res.status == 200){
        localStorage.setItem("access_token", access_token)   
        localStorage.setItem("currentUser", JSON.stringify(res.data))
        // setUser(res.data)
        navigate("/communities")
      }
    }
    catch(err){
        setError(true)
        console.log(err)
      } finally {
        setIsLoading(false); // Set loading back to false
      }
  
    }
    

  return (
    <div>
        <Navbar />
    <div style={{
        backgroundImage: `url(${Home})`,
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        }}>

            <div className='flex flex-col items-center justify-center h-screen'>
            {/* <select value={selectedEmail} onChange={handleSelect} class="bg-[#FAEFE9] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            <option value="">Select Company:</option>
            {email.map(item => (
              <option key={item._id} value={item.email}>{item.tenant}</option>
            ) )}
          </select> */}
          <p className='text-white text-5xl font-bold'>{tenants.tenant}</p>
           <input  onChange={(e)=>setEmail(e.target.value)} value={email} className='text-[#50C878] px-12 py-2 mt-3' placeholder='Enter Email'/>
            <input  onChange={(e)=>setPassword(e.target.value)} value={password}  className='text-[#50C878] px-12 py-2 mt-6' placeholder='Enter Password'/>
            <button onClick={handleLogin} className='bg-[#50C878] text-white text-lg px-12 py-2 mt-6'>{isLoading ? ('loading...') : ('Login')}</button>
            {error && <h3 className="text-red-500 text-2xl ">Email or Password is wrong</h3>}
            </div>

    </div>
    </div>
  )
}

export default CorperateLogin