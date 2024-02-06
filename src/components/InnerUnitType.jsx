
import {ImCross} from 'react-icons/im'
import { useContext, useState, useEffect } from 'react'
import { URL } from '../url'

import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'





const InnerUnityType = () => {
     

  const navigate = useNavigate()
  const [name,setName]=useState("")
  const [selectedName, setSelectedName] = useState([])
  const [price, setPrice] = useState("")
  const [bedroom,setBedroom] = useState("")
  const [selectedBedroom, setSelectedBedroom] = useState([])
  const [bathroom,setBathroom] = useState("")
  const [selectedBathroom, setSelectedBathroom] = useState([])
  const [unitNo, setUnitNo] = useState("")
  const [size, setSize] = useState("")
 

  const [community,setCommunity] = useState([])
  const [selectedCommunity, setSelectedCommunity] = useState([])
  const [numAvailable, setNumAvailable] = useState("")
  


  const [status, setStatus]=useState("")
  const [desc,setDesc]=useState("")

  const [file,setFile]=useState(null)
 
   const [updated,setUpdated]=useState(false)  
  //  const [selectedSubMarket, setSelectedSubMarket] = useState([])
  // const [isAvailable, setIsAvailable] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState('');
  //  const [submarket, setSubMarket] = useState([])


   const names = [
{
    _id: 1,
    name: "S-1",
},
{
    _id: 2,
    name: "A-1",
},
{
    _id: 3,
    name: "A-2",
},
{
  _id: 4,
  name: "B-1",
},
{
  _id: 5,
  name: "B-2",
},
{
  _id: 6,
  name: "C-1",
}
]

const bedrooms = [
  {
    _id: 0,
    bedroom: "0",
},
  {
      _id: 1,
      bedroom: "1",
  },
  {
      _id: 2,
      bedroom: "2",
 
  },
  {
      _id: 3,
      bedroom: "3",
  },
  {
    _id: 4,
    bedroom: "4",
  },
  {
    _id: 5,
    bedroom: "5",
  },
  ]

  const bathrooms = [
    {
        _id: 1,
        bathroom:"1",
    },
    {
        _id: 2,
        bathroom:"2",
   
    },
    {
        _id: 3,
        bathroom:"3",
    },
    {
      _id: 4,
      bathroom:"4",
    },
    ]


  const handleName = (e) => {
    setSelectedName(e.target.value);
  };

  const handleBedroom = (e) => {
    setSelectedBedroom(e.target.value);
  };

  const handleBathroom = (e) => {
    setSelectedBathroom(e.target.value);
  };




  const handleCommunity = (event) => {
    setSelectedCommunity(event.target.value)
  }

  


  //getting user details
  const fetchCommunity = async ()=>{
    try{
      //  const res=await axios.get(URL+"/api/users/"+user._id)
      const res = await axios.get(URL+"/api/communities/")
       setCommunity(res.data)
     
       console.log(res.data)
     
      
    }
    catch(err){
       console.log(err)
    }
  }


  useEffect(()=>{
    fetchCommunity()
  },[])
  
 

  const handleCreate = async (e) => {
    e.preventDefault();
    const unitType = {
      name: selectedName,
      price,
      bedroom : selectedBedroom,
      size,
      bathroom : selectedBathroom,
      unitNo,
      desc,
      community: selectedCommunity,
      numAvailable,
      
    };
    if (file) {
        const data = new FormData()
        const filename = Date.now()+file.name
        data.append("img",filename)
        data.append("file", file);
        unitType.photo = filename;

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
  
      const res = await axios.post(URL+"/api/unittypes/create", unitType, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(res);
      navigate('/unittypescreated');
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
        <h1 className='font-bold md:text-2xl text-xl text-green-800 text-center'>Add a Unit Type</h1>
        <Link to="/unittypescreated"><p className='text-green-600'>See Unit Types Created</p></Link>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
        <select value={selectedName} onChange={handleName} className=''>
            <option value="">Select Name:</option>
            {names.map(item => (
              <option key={item._id} value={item.name}>{item.name}</option>
            ) )}
          </select>

        <input onChange={(e)=>setPrice(e.target.value)} value={price} type="text" placeholder='Enter Price' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
       
        <select value={selectedBedroom} onChange={handleBedroom} className=''>
            <option value="">Number of bedrooms:</option>
            {bedrooms.map(item => (
              <option key={item._id} value={item.bedroom}>{item.bedroom}</option>
            ) )}
          </select>

        <input onChange={(e)=>setSize(e.target.value)} value={size} type="text" placeholder='Enter Size' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
       

        <select value={selectedBathroom} onChange={handleBathroom} className=''>
            <option value="">Number of bathrooms:</option>
            {bathrooms.map(item => (
              <option key={item._id} value={item.bathroom}>{item._id}</option>
            ) )}
          </select>

        <input onChange={(e)=>setUnitNo(e.target.value)} value={unitNo} type="text" placeholder='Enter Unit Number' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>

          <select value={selectedCommunity} onChange={handleCommunity} className=''>
            <option value="">Select Community:</option>
            {community.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ) )}
          </select>


          <input onChange={(e)=>setNumAvailable(e.target.value)} value={numAvailable} type="text" placeholder='Enter Number Available' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
       
          {/* {selectedEstate ? <div>Selected Estate:  {selectedEstate} </div> : ''} */}


          <input onChange={(e)=>setFile(e.target.files[0])} type="file" multiple  className='px-4'/>

          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create Unit Type</button>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">Unit Type Created successfully!</h3>}
          {/* handleUserUpdate */}
        </form>

        </div>
    
       
      
       
        
        
    </div>
  )
}

export default InnerUnityType




