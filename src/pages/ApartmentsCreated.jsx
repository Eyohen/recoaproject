import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'



const data = [{
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




const ApartmentsCreated = () => {
    const [showConfirmation, setShowConfirmation] = useState("")
    const [items, setItems] = useState([])

    const fetchApartments = async () => {
        const res = await axios.get(URL+"/api/apartments")
        setItems(res.data)
        console.log(res.data)
    }


    useEffect(() => {
      fetchApartments()
    }, [])

    const handleSearch = () => {

    }


  return (
    <div className='w-full'>
        <div className='flex justify-evenly border h-12 bg-white'>
        <p>AdminNav</p>
        <p>AdminNav</p>
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
        Apartments Created
      </h1>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
          <th scope="col" class="px-6 py-3 font-light ">
              id
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              Name
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              floors
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              beds
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              price
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              size
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              type
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              location
            </th>
            <th scope="col" class="px-6 py-3 font-light">
              date
            </th>
            {/* <th scope="col" class="px-6 py-3 font-light ">
              status
            </th> */}
          
            {/* <th scope="col" class="px-6 py-3 font-light">
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
                 <td class="px-6 py-2">{item._id}</td>
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
                <td class="px-6 py-2">{item.roomName}</td>
                <td class="px-6 py-2">{item.floorsAvailable}</td>
                <td class="px-6 py-2">{item.bedroom}</td>
                <td class="px-6 py-2">{item.price}</td>
                <td class="px-6 py-2">{item.size}</td>
                <td class="px-6 py-2">
                   {item.type}
                    </td>
                    <td class="px-6 py-2">{item.location}</td>
                    <td class="px-6 py-2">{item.createdAt}</td>
                {/* <td class="px-6 py-4">
                {items.status == "preleasing" ?  ( <p className='bg-green-400 px-1 rounded-3xl text-white'>{item.status}</p>) : ( <p className='bg-red-400 px-1 rounded-3xl text-white'>{item.status}</p>)}
                </td> */}
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

export default ApartmentsCreated