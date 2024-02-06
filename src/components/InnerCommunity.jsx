
import {ImCross} from 'react-icons/im'
import { useContext, useState, useEffect } from 'react'
import { URL } from '../url'

import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'





const InnerCommunity = () => {
     

  const navigate = useNavigate()
  const [name,setName]=useState("")
  const [status, setStatus]=useState("")
  const [desc,setDesc]=useState("")

  const [file,setFile]=useState(null)
 
   const [updated,setUpdated]=useState(false)  
   const [selectedSubMarket, setSelectedSubMarket] = useState([])
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

 
   const [submarket, setSubMarket] = useState([])


   const statuses = [{
    _id: 12,
    status: "Now pre-leasing",
   
},
{
    _id: 13,
    status: "Join waitlisting",

},
{
    _id: 14,
    status: "Coming Soon",
},
{
  _id: 15,
  status: "Opening in",
}

]




  const handleStatus = (e) => {

    setSelectedStatus(e.target.value);
  
  };




  const handleSelect = (event) => {
    setSelectedSubMarket(event.target.value)
  }

  


  //getting user details
  const fetchSubMarket = async ()=>{
    try{
      //  const res=await axios.get(URL+"/api/users/"+user._id)
      const res = await axios.get(URL+"/api/submarkets/")
       setSubMarket(res.data)
     
       console.log(res.data)
     
      
    }
    catch(err){
       console.log(err)
    }
  }


  useEffect(()=>{
    fetchSubMarket()
  },[])
  
 

  const handleCreate = async (e) => {
    e.preventDefault();
    const community = {
      name,
      desc,
      status: selectedStatus,
      submarket: selectedSubMarket,
    };
    if (file) {
        const data = new FormData()
        const filename = Date.now()+file.name
        data.append("img",filename)
        data.append("file", file);
        community.photo = filename;

        try{
          const accessToken = localStorage.getItem("access_token");

          if(!accessToken){
                // Handle the case where the access token is not available
            console.error('Access token not found')
          }

          const imgUpload = await axios.post(URL+"/api/upload",data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          // console.log(imgUpload.data)
        }
        catch(err){
          console.log(err.message)
        }
      }
        
  
      try {

        const accessToken = localStorage.getItem("access_token")

        if(!accessToken){
          // Handle the case where the access token is not available
      console.error('Access token not found')
    }
  
      const res = await axios.post(URL+"/api/communities/create", community, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(res);
      navigate('/communitiescreated');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-full bg-gray-200'>
        <div className='flex justify-evenly border h-12 bg-white'>
        <p>Administration</p>
        <p>Administration</p>

        </div>

        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl text-green-800 text-center'>Add a Community</h1>
        <Link to="/communitiescreated"><p className='text-green-600'>See Communities Created</p></Link>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Community Name' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
       
          <select value={selectedSubMarket} onChange={handleSelect} className=''>
            <option value="">Select Submarket:</option>
            {submarket.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ) )}
          </select>
          {/* {selectedEstate ? <div>Selected Estate:  {selectedEstate} </div> : ''} */}


          <input onChange={(e)=>setFile(e.target.files[0])} type="file" multiple  className='px-4'/>

          {/* <select value={selectedStatus} onChange={handleStatus} className=''>
            <option value="">Select Status:</option>
            {subMarkets.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ) )}
          </select> */}







<select value={selectedStatus} onChange={handleStatus} className=''>
            <option value="">Select Status:</option>
            {statuses.map(item => (
              <option key={item._id} value={item.status}>{item.status}</option>
            ) )}
          </select>

          
          <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg' placeholder='Give a description of the apartment'/>
          {/* <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button> */}
          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create Community</button>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">Community created successfully!</h3>}
          {/* handleUserUpdate */}
        </form>

        </div>
    
       
      
       
        
        
    </div>
  )
}

export default InnerCommunity




