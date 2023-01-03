import { CButton, CCard, CCardBody, CCardImage, CCardTitle } from '@coreui/react';
import './styles/Favorite.css'
import React from 'react'
import { Col, Row } from 'react-bootstrap';

const Favorite = () => {
    const api = 'http://35.180.87.223:1337'
    const tk = localStorage.getItem('token')
    let before = localStorage.getItem('user-data-book');
    let data = JSON.parse(before);

    if(tk !== null && before !== '[]' && before !== 'null'){
        return (
            <div style={{marginLeft:80, marginTop:20}}>
                <h1> Your Favorite Books</h1>
                <Row>
                {data?.map((item) => (
                    <Col md={4} key={item?.slug}>
                    <CCard className='card-section' >
                            <CCardImage orientation="top" src={api + item?.image} />
                    <CCardBody>
                    <CCardTitle>{item?.title}</CCardTitle>
                        <CButton color="dark" href={`/book/${item?.slug}`}>See more</CButton>
                    </CCardBody>
                    </CCard>
                    </Col>           
                ))}
                </Row>
            </div>
          )
    } else if (before === 'null' || before === '[]'){
        return(
            <div className='no-data'>
                <h3>¯\_(ツ)_/¯</h3>
                <h2>No books added to your favorite section.</h2>
            </div>
        )
    } else if (tk === null){
        return(
            <div className='no-data' >
                <h3>¯\_(ツ)_/¯</h3>
                <h2 >You need to be logged in to see this section.</h2>
            </div>
        )
    }
}

export default Favorite