import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication=true}) {
    const navigate = useNavigate()
    const {loader,setLoader} = useState()
    const authStatus = useSelector((state)=>(state.auth.status))

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
    },[authStatus, authentication, navigate])

  return (
    <div>
      loader ? <h2>Loading....</h2> : {children} 
    </div>
  )
}

