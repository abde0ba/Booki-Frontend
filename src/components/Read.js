import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import './styles/Read.css'
import { CButton } from '@coreui/react';

function Read() {
    
    const api = 'http://35.180.87.223:1337';
    const {slug} = useParams();
    const [file, setFile] = useState([]);


    let fileData
    file?.map((item) => (
        item?.attributes?.bookfile?.data?.map((data) => (
            fileData = api+data?.attributes?.url 
        ))
        ))

    useEffect(() => {
        const fetchingData = async () => {
            
            const response = await axios.get(`${api}/api/books?filters[slug][$eq]=${slug}&populate=*`)
            await setFile(response?.data?.data)
            await console.log(response)
            
            
        }
        fetchingData()

            
    },[slug, fileData])

   
    let navId = document.getElementById('navbar-id')
    if(navId){
      navId.style.display = 'none';
    }
   
  return (
    <div>
    <div id="pdfviewer" style={{position: 'relative'}}>
    <div className='read-btns'>
    <CButton href={`/book/${slug}`} color="dark" >Go back</CButton>
    <CButton onClick={() => window.location.reload()} color="dark" ><i className="fa-solid fa-rotate-right"></i></CButton>
    </div>
      <iframe
      title='Book Viewer'
      id='iframe'  src={`https://docs.google.com/viewer?url=${fileData}&embedded=true`}></iframe>
      <div style={{width: 40,height: 40, position: 'absolute', opacity: 0, right: 12, top: 12,}}>&nbsp;</div>

    </div>
      
    </div>
  )
}

export default Read