
import {ImCross} from 'react-icons/im'
import { useContext, useState, useEffect } from 'react'
import { URL } from '../url'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router-dom'





const InnerEstate = () => {
     
  const param=useParams().id
  const navigate = useNavigate()
    
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [location,setLocation]=useState("")
  const [status,setStatus]=useState("")
  const [file,setFile]=useState(null)
  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])
   const [updated,setUpdated]=useState(false)  
  const [isAvailable, setIsAvailable] = useState(false);

  


  //getting user details
  // const fetchEstate = async ()=>{
  //   try{
  //     //  const res=await axios.get(URL+"/api/users/"+user._id)
  //     const res=await axios.get(URL+"/api/users/"+param)
  //      setRoomName(res.data.roomName)
  //      setFloorsAvailable(res.data.floorsAvailable)
  //      setBedroom(res.data.bedroom)
  //      setType(res.data.type)
  //      setDesc(res.data.desc)     
  //      setPrice(res.data.price)
  //      setBathroom(res.data.bathroom)
  //      setSize(res.data.size)
  //      setCats([...res.data.categories])
  //      setLocation(res.data.location)
  //      setIsAvailable(res.data.isAvailable)
  //      console.log(res.data)
     
      
  //   }
  //   catch(err){
  //      console.log(err)
  //   }
  // }

//   useEffect(()=>{
//     fetch()
//   },[param])
  

 

  const addCategory = () => {

  }

  const deleteCategory = () => {
    
  }

  const handleCreate = async(e) => {
    e.preventDefault()
    const post={
      name,
      description,
      location,
      status,
      categories:cats,

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
        const imgUpload=await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
        
      }
      catch(err){
        console.log(err)
      }
    }



    try{
      const res=await axios.post("http://localhost:9000/api/estates/create",post,{withCredentials:true})
      //navigate("/posts/post/"+res.data._id)
    navigate('/estatescreated')
      setName("")
      setDescription("")
      setLocation("")
      setStatus("")
    
  
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
        <h1 className='font-bold md:text-2xl text-xl text-green-800 text-center'>Add an Estate</h1>
        <Link to="/estatescreated"><p className='text-green-600'>See Estates Created</p></Link>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Estate Name' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
     
          <input onChange={(e)=>setLocation(e.target.value)} value={location} type="text" placeholder='Enter Location' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>
         
          <input onChange={(e)=>setStatus(e.target.value)} value={status} type="text" placeholder='Enter status e.g new pre-leasing' className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg'/>

        <input onChange={(e)=>setFile(e.target.files[0])} type="file" multiple  className='px-4'/>
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


          <p>Write a description about the estate</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={15} cols={30} className='px-4 py-2 outline-none text-gray-400 border border-gray-400 rounded-lg' placeholder='Give a description of the apartment'/>
          {/* <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button> */}
          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create Apartment</button>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">profile updated successfully!</h3>}
          {/* handleUserUpdate */}
        </form>

        </div>
    
       
      
       
        
        
    </div>
  )
}

export default InnerEstate