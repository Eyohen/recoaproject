import { Link, useNavigate } from "react-router-dom"
// import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
// import  "./clientlogin.css"


const ClientLogin = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password})
      // console.log(res.data)
      setUser(res.data)
      navigate("/adminpage")

    }
    catch(err){
      setError(true)
      console.log(err)
    }

  }
  return (
    <>
     <div className='relative'>
        <img src={"https://newsverge.com/wp-content/uploads/2021/03/Shell.jpeg"} alt='' className='w-full h-screen object-cover brightness-75'/>


        <div class="absolute top-[200px] left-[550px] w-full">
     <p className='text-white absolute font-bold text-5xl ml-20 text-center '>Shell Nigeria</p>
      

    {/* <div className="flex flex-col items-center mx-auto"> */}
    <input onChange={(e)=>setEmail(e.target.value)} className="absolute w-[530px] h-9 rounded-lg mt-16" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="absolute w-[530px] h-9 rounded-lg mt-32" type="password" placeholder="Enter your password" />
         {/* </div> */}
         <button onClick={handleLogin} className="px-16 py-4 mx-[150px] text-lg font-bold text-white border-2 rounded-full hover:bg-gray-500 hover:text-black mt-64">Log in</button>
 </div>



    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
    <h1 className="text-3xl md:text-3xl font-bold"><Link to="/home" className="text-green-800 font-Comfortaa">Recoa</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
<div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left font-Comfortaa text-green-800">Admin Login</h1>
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2  border border-green-800 outline-0 rounded-lg" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2  border border-green-800 outline-0 rounded-lg" type="password" placeholder="Enter your password" />
         <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-green-800 rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p className="text-green-800">New here?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
         </div>
       </div>
    </div>
    </div>
    {/* <Footer/> */}
    </>
    
  )
}

export default ClientLogin