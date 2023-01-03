import { CButton, CCard, CCardBody, CCardImage, CCardTitle } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './styles/Search.css'

const Search = () => {
    const api = 'http://35.180.87.223:1337'
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            const response = await axios.get(`${api}/api/books?populate=*`)   
            setBooks(response?.data?.data)

        }
        fetchingData()

        let inputBtn = document.getElementById('input-btn')
        if(query.length > 0){
          inputBtn.style.display = 'inline'
        } else {
          inputBtn.style.display = 'none'
        }
    }, [books, query.length])

    
  return (
    <div className='search-section'>
      <div className='search-input-section'>
        <input 
        className='search-input'
        placeholder='Search for books'
        value={query}
        onChange={(e) => setQuery(e.target.value)}

         />
        <button id='input-btn' onClick={() => setQuery('')}><i className="fa-solid fa-x"></i></button>
      </div>
        <div>
            <Row>
            {books?.filter(book => {
             if (query === '') {
              return book;
            } else if (book?.attributes?.title.toLowerCase().includes(query.toLowerCase())) {
              return book
            }
          })
            ?.map((item) => (
            

                <Col md={4} key={item?.attributes?.slug}>
            <CCard className='card-section' >
            {item?.attributes?.image?.data?.map((img) => (
                    <CCardImage key={img?.id} orientation="top" src={api+img?.attributes?.url} />
                    ))}
            <CCardBody>
            <CCardTitle>{item?.attributes?.title}</CCardTitle>
                <CButton href={`/book/${item?.attributes?.slug}`} color="dark" >See more</CButton>
            </CCardBody>
            </CCard>
                </Col>
           
            
            
        ))}
            </Row>
        </div>
    </div>
  )
}

export default Search