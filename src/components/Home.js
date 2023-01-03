import React, {useEffect, useState} from 'react'
import { CCard, CCardImage, CCardBody, CCardTitle, CButton } from '@coreui/react';
import { Col, Row } from 'react-bootstrap';
import './styles/Home.css'
import axios from 'axios';


const Home = () => {
    const api = 'http://35.180.87.223:1337'
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
           const response = await axios.get(`${api}/api/popular-books?populate=*`)
            await setBooks(response?.data?.data)
        }
        fetchingData()
        const categoriesFetch = async () => {
            const response = await axios.get(`${api}/api/categories?populate=*`)
            await setCategories(response?.data?.data)
        }
        categoriesFetch()
       

        let navId = document.getElementById('navbar-id')
        if(navId){
            navId.style.display = 'block';
        }
    }, [])


  return (
    <div className='home-section'>
        
        <div style={{marginLeft:80}}>
            <h1>Poupular Books</h1>
        <Row>
        {books?.map((item) => (
            item?.attributes?.books?.data?.map((book) => (

                <Col md={4} key={book?.attributes?.slug}>
            <CCard className='card-section' >
                
                    <CCardImage key={book?.id} orientation="top" src={api+book?.attributes?.img_url} />
                
            
            <CCardBody>
            <CCardTitle className='book-title'>{book?.attributes?.title}</CCardTitle>
                <CButton href={`/book/${book?.attributes?.slug}`} color="dark" >See more</CButton>
            </CCardBody>
            </CCard>
                </Col>
            ))
            
            
        ))}
        </Row>

        </div>
        
        
            
        {categories?.map((item) => (
            
                <div style={{marginLeft:80}} key={item?.id}>
                <h1>{item?.attributes?.name}</h1>
                <Row>
            {item?.attributes?.books?.data?.map((book) => (
                
                <Col md={4}  key={book?.attributes?.slug}>
            <CCard className='categories-card-section' >
                
                    <CCardImage key={book?.id} orientation="top" src={api+book?.attributes?.img_url} />
                
            
            <CCardBody>
            <CCardTitle className='book-title'>{book?.attributes?.title}</CCardTitle>
                <CButton href={`/book/${book?.attributes?.slug}`} color="dark" >See more</CButton>
            </CCardBody>
            </CCard>
                </Col>
                
            ))}
            </Row>
            </div>
            
        ))}
          
        
        
        
    </div>
  )
}

export default Home