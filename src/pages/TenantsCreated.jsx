import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { SlPencil } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { UserContext } from "../context/UserContext"




const TenantsCreated = () => {
  const navigate=useNavigate()
    const [showConfirmation, setShowConfirmation] = useState("")
    const [items, setItems] = useState([])

    const fetchApartments = async () => {

      const accessToken = localStorage.getItem("access_token");

      if(!accessToken){
            // Handle the case where the access token is not available
        console.error('Access token not fund')
      }


        const res = await axios.get(URL+"/api/tenants",{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        )
        setItems(res.data)
        console.log(res.data)
    }


    useEffect(() => {
      fetchApartments()
    }, [])


    const handleSearch = () => {

    }

    const handleDelete=async(itemId)=>{
      try{
        const accessToken = localStorage.getItem("access_token");

        if(!accessToken){
              // Handle the case where the access token is not available
          console.error('Access token not found')
        }
  
  
        const res = await axios.delete(URL+"/api/estates/"+itemId,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setItems((prevData) => prevData.filter(item => item._id !== itemId));
        console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }



  return (
    <div className='w-full'>
        <div className='flex justify-evenly border h-12 bg-white'>
        <p>AdminNav</p>
        <p>AdminNav</p>
        </div>

        <div onClick={() => navigate(-1)} className="flex items-center space-x-3 pt-6 px-12">
        <SlArrowLeft />
        <h1 className='font-bold md:text-2xl text-xl '>Back</h1>
        </div>

      

        <div className='max-w-[1100px] bg-white mx-auto'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
      {/* <div className="flex justify-between">
        <Link to={"/home"}>
          <button className="bg-[#2C5C4B] p-2 text-white rounded-lg">
            All Participants
          </button>
        </Link>

        <div>
          <input
            type="text"
            placeholder="Search name"
            className=" h-10 border border-gray-500"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-[#2C5C4B] p-2 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div> */}

      <h1 className="font-bold text-xl mt-10 text-center">
            Tenants Created
      </h1>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
          <th scope="col" class="px-6 py-3 font-light ">
              id
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              tenants
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              Email
            </th>
        
            <th scope="col" class="px-6 py-3 font-light">
              date
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              edit
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              delete
            </th>
            {/* <th scope="col" class="px-6 py-3 font-light">
              time
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              type
            </th> */}
            {/* <th scope="col" class="px-6 py-3 font-light ">
              status
            </th>
          
            <th scope="col" class="px-6 py-3 font-light">
              check
            </th> */}
          </tr>
        </thead>
        <tbody>
          {/* {data?.data?.participants
            .filter((user) => user.BetTribeLog !== null)
            .map((user, index) => ( */}
            {items.map((item) => (
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                key={item._id}
              >
                 <td class="px-6 py-2">{item._id.slice(0,6)}</td>
                {/* <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  
                  <img
                    className="w-11 h-11"
                    src={user?.BetTribeLog?.profileImage}
                    alt=""
                  />
                </th> */}
                <td class="px-6 py-2">{item.tenant}</td>
                <td class="px-6 py-2">{item.email}</td>
               
                {/* <td class="px-6 py-2">{user.date}</td>
                <td class="px-6 py-2">{user.time}</td>
                <td class="px-6 py-2">
                   {user.type}
                    </td> */}
            
                <td class="px-6 py-2">{item.createdAt}</td>
                <Link to={`/editestate/${item._id}`}><td class="px-6 py-2"><SlPencil className='mt-3' /></td></Link>
                <td class="px-6 py-2" onClick={() => handleDelete(item._id)}><SlTrash className='text-red-800'/></td>
                {/* <td class="px-6 py-4">{user.BetTribeLog.betwinnerId}</td>
                <td class="px-6 py-4">{user.BetTribeLog.BetTribe.name}</td> */}
                {/* <td class="px-6 py-4">
                  {user.BetTribeLog.isVerified ? (
                    <input
                      type="checkbox"
                      disabled // Disable the checkbox for checked participants
                      checked={user.BetTribeLog.isVerified}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e, user.email)}
                      id="email"
                      name="email"
                      checked={user.BetTribeLog.isVerified}
                    />
                  )}
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
      {showConfirmation && (
        <ConfirmationPopup
          email={selectedParticipantEmail}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={confirmParticipant}
        />
      )}
    </div>
        </div>
       
      
       
        
        
    </div>
  )
}

export default TenantsCreated