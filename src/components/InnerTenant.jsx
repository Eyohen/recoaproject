
import {ImCross} from 'react-icons/im'
import { useContext, useState, useEffect } from 'react'
import { URL } from '../url'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'





const InnerTenant = () => {
     
  const param=useParams().id
  const navigate = useNavigate()
  const {user}=useContext(UserContext)
    
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [tenant,setTenant]=useState("")
//   const [status,setStatus]=useState("")
//   const [file,setFile]=useState(null)
//   const [cat,setCat]=useState("")
//   const [cats,setCats]=useState([])
   const [updated,setUpdated]=useState(false)  
//   const [isAvailable, setIsAvailable] = useState(false);

  

  const handleCreate = async(e) => {
    e.preventDefault()
    const post = {
      tenant,
      email,
      password,
     

    }

  

    try{
    //   const accessToken = localStorage.getItem("access_token");

    //   if(!accessToken){
    //         // Handle the case where the access token is not available
    //     console.error('Access token not fund')
    //   }

    setUpdated(false)
      const res = await axios.post(URL+"/api/tenants/register",post)
 
      
        setUpdated(true)
         setTenant("")
         setEmail("")
         setPassword("")
         console.log(res.data)
  
    }
    catch(err){
      console.log(err)
      setUpdated(false)
    }

  }
  

 

  return (
    <div className='w-full bg-gray-200'>
        <div className='flex justify-evenly border h-12 bg-white'>
        <p>Administration</p>
        <p>Administration</p>

        </div>

        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl text-green-800 text-center'>Create a tenant</h1>
        <Link to="/tenantscreated"><p className='text-green-600'>See Tenants Created</p></Link>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
        <input onChange={(e)=>setTenant(e.target.value)} value={tenant} type="text" placeholder='Enter Tenant name' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Enter Tenant Email' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
     
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder='Enter Tenant Password' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
         
          {/* <input onChange={(e)=>setStatus(e.target.value)} value={status} type="text" placeholder='Enter status e.g new pre-leasing' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>

        <input onChange={(e)=>setFile(e.target.files[0])} type="file" multiple  className='px-4'/> */}
           {/*  <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none border border-gray-400 rounded-lg' placeholder='Please list your skills' type="text"/>
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
            </div> */}

            {/* categories */}
            {/* <div className='flex px-4 mt-3'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            
            
            </div>
          </div> */}

              {/* <div className='flex space-x-3'>
          <input checked={isAvailable} type="checkbox" value={isAvailable} onChange={() => setIsAvailable(isAvailable => !isAvailable)}
           className='border border-green-600 rounded-full '/>
          <p>Available for a Gig</p>
          </div> */}

{/* 
          <p>Write a description about the estate</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={15} cols={30} className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg' placeholder='Give a description of the apartment'/> */}
          {/* <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button> */}
          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create Tenant</button>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">Tenant created successfully!</h3>}
          {/* handleUserUpdate */}
        </form>

        </div>
    
       
      
       
        
        
    </div>
  )
}

export default InnerTenant