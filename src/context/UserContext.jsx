/* eslint-disable react/prop-types */


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";
import { useParams } from "react-router-dom";


export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user,setUser] = useState(null)

    useEffect(()=>{
      getUser()

    },[])

    const getUser = async()=>{
    //   try{
    //     const res=await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
    //     // console.log(res.data)
    //     setUser(res.data)

    //   }
    //   catch(err){
    //     console.log(err)
    //   }

    try {
      const accessToken = localStorage.getItem("access_token");

      if(!accessToken){
            // Handle the case where the access token is not available
        console.error('Access token not found')
      }

      const res = await axios.get(URL+"/api/auth/refetch" , {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log("refetch",res.data)
      setUser(res.data)
    } catch(err){
      console.log(err)
    }
    }
    
    return (<UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}