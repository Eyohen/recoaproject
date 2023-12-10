
import {ImCross} from 'react-icons/im'
import { useContext, useState, useEffect } from 'react'
import { URL } from '../url'

import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'





const InnerApartment = () => {
     
  const param=useParams().id
  const navigate = useNavigate()
  const [roomName,setRoomName]=useState("")
  const [floorsAvailable,setFloorsAvailable]=useState("")
  const [location,setLocation]=useState("")
  const [bedroom,setBedroom]=useState("")
  const [type,setType]=useState("")
  const [desc,setDesc]=useState("")
  const [price,setPrice]=useState("")
  const [size,setSize]=useState("")
  const [bathroom,setBathroom]=useState("")
  const [file,setFile]=useState(null)
  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])
   const [updated,setUpdated]=useState(false)  
   const [selectedEstate, setSelectedEstate] = useState([])
  const [isAvailable, setIsAvailable] = useState(false);
  // const options = [
  //   {label: "Red", value:1},
  //   {label: "Green", value:2},
  //   {label: "Blue", value:3},
  //   {label: "Yellow", value:4},
  // ]
  // const [value, setValue] = useState('')
  const [estate, setEstate] = useState([])

  const handleSelect = (event) => {
    setSelectedEstate(event.target.value)
  }

  


  //getting user details
  const fetchEstate =async ()=>{
    try{
      //  const res=await axios.get(URL+"/api/users/"+user._id)
      const res=await axios.get(URL+"/api/estates/")
       setEstate(res.data)
      //  setFloorsAvailable(res.data.floorsAvailable)
      //  setBedroom(res.data.bedroom)
      //  setType(res.data.type)
      //  setDesc(res.data.desc)     
      //  setPrice(res.data.price)
      //  setBathroom(res.data.bathroom)
      //  setSize(res.data.size)
      //  setCats([...res.data.categories])
      //  setLocation(res.data.location)
      //  setIsAvailable(res.data.isAvailable)
       console.log(res.data)
     
      
    }
    catch(err){
       console.log(err)
    }
  }


  useEffect(()=>{
    fetchEstate()
  },[])
  
 

  const addCategory = () => {

  }

  const deleteCategory = () => {
    
  }

  const handleCreate = async(e) => {
    e.preventDefault()
    const post={
      roomName,
      desc,
      floorsAvailable,
      price,
      bathroom,
      type,
      categories:cats,
      location,
      size,
      isAvailable,
      bedroom,
      estate:selectedEstate
    }

    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo=filename
      console.log(data)
      //img upload
      try{
        const imgUpload = await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
        
      }
      catch(err){
        console.log(err)
      }
    }



    try{
      const res=await axios.post(URL+"/api/apartments/create",post,{withCredentials:true})
      navigate('/apartmentscreated')
      setRoomName("")
      setFloorsAvailable("")
      setDescription("")
      setBedroom("")
      setBathroom("")
      setPrice("")
      setSize("")
      setType("")
      setLocation("")
      console.log(post)
  
    }
    catch(err){
      console.log(err)
    }

  }
  

 

  return (
    <div className='w-full bg-gray-200'>
        <div className='flex justify-evenly border h-12 bg-white'>
        <p>AdminNav</p>
        <p>AdminNav</p>
        </div>

        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl text-green-800 text-center'>Add an Apartment</h1>
        <Link to="/apartmentscreated"><p className='text-green-600'>See Apartments Created</p></Link>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
        <input onChange={(e)=>setRoomName(e.target.value)} value={roomName} type="text" placeholder='Enter Apartment Name' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
        <input onChange={(e)=>setFloorsAvailable(e.target.value)} value={floorsAvailable} type="text" placeholder='Enter available floors ' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
          <input onChange={(e)=>setLocation(e.target.value)} value={location} type="text" placeholder='Enter Location' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
          <input onChange={(e)=>setBedroom(e.target.value)} value={bedroom} type="text" placeholder='Enter number of Bedrooms' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
          <input onChange={(e)=>setType(e.target.value)} value={type} type="text" placeholder='Enter apartment type' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} type="text" placeholder='Enter Price' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
          <input onChange={(e)=>setSize(e.target.value)} value={size} type="text" placeholder='Enter size' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
          <input onChange={(e)=>setBathroom(e.target.value)} value={bathroom} type="text" placeholder='Enter number of bathrooms' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>

          
          <select value={selectedEstate} onChange={handleSelect} className=''>
            <option value="">Select Estate:</option>
            {estate.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ) )}
          </select>
          {/* {selectedEstate ? <div>Selected Estate:  {selectedEstate} </div> : ''} */}


          <input onChange={(e)=>setFile(e.target.files[0])} type="file" multiple  className='px-4'/>
        
      
          

              {/* <div className='flex space-x-3'>
          <input checked={isAvailable} type="checkbox" value={isAvailable} onChange={() => setIsAvailable(isAvailable => !isAvailable)}
           className='border border-green-600 rounded-full '/>
          <p>Available for a Gig</p>
          </div> */}


          
          {/* <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg' placeholder='Give a description of the apartment'/> */}
          {/* <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button> */}
          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create Apartment</button>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">profile updated successfully!</h3>}
          {/* handleUserUpdate */}
        </form>

        </div>
    
       
      
       
        
        
    </div>
  )
}

export default InnerApartment