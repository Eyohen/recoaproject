import { Link, useNavigate } from "react-router-dom"
// import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import {URL} from '../url'


const Register = () => {

  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleRegister=async ()=>{
    
    try{
      const res=await axios.post(URL+"/api/auth/register",{firstName,lastName,email,password})
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")
      
    }
    catch(err){
      setError(true)
      console.log(err)
    }

  }

  

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-3xl md:text-3xl font-bold"><Link to="/home" className="text-[#0096FF] font-Comfortaa">Geega</Link></h1>
    <h3><Link to="/login">Login</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left text-[#0096FF] font-Comfortaa">Create a Gig Worker Account</h1>
         <input onChange={(e)=>setFirstName(e.target.value)} className="w-full px-4 py-2 border border-[#0096FF] outline-0 rounded-lg" type="text" placeholder="Enter your first name" />
         <input onChange={(e)=>setLastName(e.target.value)} className="w-full px-4 py-2 border border-[#0096FF] outline-0 rounded-lg" type="text" placeholder="Enter your last name" />
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border border-[#0096FF] outline-0 rounded-lg" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border border-[#0096FF] outline-0 rounded-lg" type="password" placeholder="Enter your password" />
         <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-[#0096FF] rounded-lg hover:bg-gray-500 hover:text-black font-Comfortaa ">Register</button>
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p className="text-blue-600">Already have an account?</p>
          <p className="text-gray-500 hover:text-blue-600"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Register