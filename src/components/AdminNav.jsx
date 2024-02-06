import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {URL, IF} from '../url'
import { UserContext } from '../context/UserContext'

import axios from 'axios'

const datas = [{
    id: 14664,
    tenant: "Shell Intl",
    email: "shell.nigeria@gmail.com",
    phone: "0907837433",
    status: "preleasing",
    date: "19-03-2024",
    type: "studio",
    time: "3pm",

},
{
    id: 14664,
    tenant: "Chevron",
    email: "chevron.nigeria@gmail.com",
    phone: "0907837433",
    status: "waitlisting",
    date: "19-03-2024",
    type: "studio",
    time: "3pm",

},
{
    id: 14664,
    tenant: "ExxonMobil",
    email: "exxon.nigeria@gmail.com",
    phone: "0907837433",
    status: "preleasing",
    date: "19-03-2024",
    type: "studio",
    time: "3pm",

}

]




const AdminNav = () => {
  const {user,setUser}=useContext(UserContext)
    const [showConfirmation, setShowConfirmation] = useState("")
    const [data, setData] = useState([])
    const navigate = useNavigate()
  

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
  
    //      const res = await axios.get(URL+"/api/users/"+currentUser?._id, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       }
    //     })
        
    //      console.log(res.data)
    //      setData(res.data)
    //   }
    //   catch(err){
    //      console.log(err)
    //   }
    // }
    
  
    // useEffect(()=>{
    //   fetchProfile()
    
    // },[])
  
    // const logOut = async () => {
    //   localStorage.removeItem("access_token");
    //   localStorage.removeItem("currentUser");
    //   setData(null)
    //   navigate("/admin")
    // }  
  

      const logOut = async () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("currentUser");
      setUser(null)
      navigate("/admin")
    }  
  


  return (
    <div className='w-full bg-gray-200'>
        <div className='flex justify-evenly border h-12 bg-white p-2'>
        <p>Administration</p>
        <p>{user? "logged In" : "Not logged in"}</p>

        <button onClick={logOut} className='bg-green-400 px-4 text-white'>LogOut</button>
        </div>

        <div className='flex space-x-10 justify-center mt-6'>

            <div className='border px-20 py-6 shadow-xl rounded-2xl bg-white'>
        <p className='text-md'>Users</p>
        <p className='text-2xl font-medium'>175</p>
        </div>

        <div className='border px-20 py-6 shadow-xl rounded-2xl text-center bg-white'>
        <p className='text-md'>Booked Apartments</p>
        <p className='text-2xl font-medium'>175</p>
        </div>

        <div className='border px-20 py-6 shadow-xl rounded-2xl text-center bg-white'>
        <p className='text-md'>Booked Floors</p>
        <p className='text-2xl font-medium'>175</p>
        </div>
     
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
        Apartments Booked
      </h1>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
          <th scope="col" class="px-6 py-3 font-light ">
              id
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              tenant
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              email
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              phone
            </th>
       
            <th scope="col" class="px-6 py-3 font-light">
              date
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              time
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              type
            </th>
            <th scope="col" class="px-6 py-3 font-light ">
              status
            </th>
          
            <th scope="col" class="px-6 py-3 font-light">
              check
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {data?.data?.participants
            .filter((user) => user.BetTribeLog !== null)
            .map((user, index) => ( */}
            {datas.map((user, index) => (
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                key={user.id}
              >
                 <td class="px-6 py-2">{index + 1}</td>
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
                <td class="px-6 py-2">{user.tenant}</td>
                <td class="px-6 py-2">{user.email}</td>
                <td class="px-6 py-2">{user.phone}</td>
                <td class="px-6 py-2">{user.date}</td>
                <td class="px-6 py-2">{user.time}</td>
                <td class="px-6 py-2">
                   {user.type}
                    </td>
                <td class="px-6 py-4">
                {user.status == "preleasing" ?  ( <p className='bg-green-400 px-1 rounded-3xl text-white'>{user.status}</p>) : ( <p className='bg-red-400 px-1 rounded-3xl text-white'>{user.status}</p>)}
                </td>
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

export default AdminNav