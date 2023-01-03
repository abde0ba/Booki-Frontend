import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './styles/Dashboard.css'
import { CButton } from '@coreui/react';

const Dashboard = () => {

  const [userData, setUserData] = useState([]);
  const tk = localStorage.getItem('token')
  const api = 'http://35.180.87.223:1337';
  let beforeSlice = localStorage.getItem('userid')
  
  useEffect(() => {
    
    const getData = async () => {
      const response = await axios({
        method: 'get',
        url:`${api}/api/users/me`,
        headers: { Authorization: `Bearer ${tk}` },
      });
      console.log(response?.data?.id)
      setUserData(response?.data)
      if(!localStorage.getItem('userid')){
      localStorage.setItem('userid', `s${response?.data?.id}`);
    } else {
      return
    }
    }
    getData()
    
    
    
  }, [tk])

  const handleLogOut = (e) => {
    let userId = beforeSlice.slice(1, beforeSlice.length)
    e.preventDefault()
    if(localStorage.getItem('token')){
      let dataStore = localStorage.getItem('user-data-book')
      const sendData = async () => {
        await axios.put(`${api}/api/users/${userId}/?filters=[userdata]`, {
            userdata: dataStore,
        },
        {
            headers: { Authorization: `Bearer ${tk}` }
        })
        
      }
      sendData()
      localStorage.clear()
      window.location.href = '/login';
    }
  }
  return (
    <div className='dashboard'>
      <div>
      <h1>Dashboard</h1>
      <h4>Username : {userData?.username}</h4>
      <h4>Email : {userData?.email}</h4>
      <CButton color="light" onClick={handleLogOut}>Logout</CButton>
      </div>
    </div>
  )
}

export default Dashboard