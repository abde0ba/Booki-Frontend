import { CButton } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './styles/Article.css'
function Article() {
    
    const api = 'http://35.180.87.223:1337';
    const {slug} = useParams();
    const [book, setBook] = useState([]);
    const [bookData, setBookData] = useState();
    
    
    useEffect(() => {
        const fetchingData = async () => {
           
           const response = await axios.get(`${api}/api/books?filters[slug][$eq]=${slug}&populate=*`)
            await setBook(response?.data?.data)
            
            
        }
        fetchingData()
        if(localStorage.getItem('check-exi') == null){
            localStorage.setItem('check-exi', 'no')
            
        }
        if(localStorage.getItem('user-data-book') === 'null' || localStorage.getItem('user-data-book') === '') {
            localStorage.setItem('user-data-book', '[]')
        }
        
        let navId = document.getElementById('navbar-id')
        
        navId.style.display = 'block';
        

       
            
    }, [slug])
        useEffect(() => {
            
            const checkData = () => {
                let data
                
                    book.map((item) => (
                    item?.attributes?.image?.data?.map((img) => (
                      data = {
                            title:item?.attributes?.title,
                            slug:item?.attributes?.slug,
                            image:img?.attributes?.url
                      }
                        ))
                      
                      ))
                    setBookData(data)
                    let userData = localStorage.getItem('user-data-book')
                    let before = JSON.parse(userData)
                    
                    for(let i = 0; i < before?.length; i++){
                        if(before[i]?.title === bookData?.title){
                           return localStorage.setItem('check-exi', 'yes')
                        } 
                        localStorage.setItem('check-exi', 'no')
                        
                            
                        
                    }

            }
            checkData()
        }, [book, bookData?.title])
    

    const handleFavorite = () => {

        
        
        if(localStorage.getItem('user-data-book')){
            let userData = localStorage.getItem('user-data-book')
            let before = JSON.parse(userData)
            before.push(bookData)
            let after = JSON.stringify(before)
            localStorage.setItem('user-data-book', after)
            localStorage.setItem('check-exi', 'yes')
            window.location.href = `/book/${bookData.slug}`
            }

        if(localStorage.getItem('user-data-book') === null ||  localStorage.getItem('user-data-book') === '[]') {
            let init = JSON.stringify([bookData])
            localStorage.setItem('user-data-book', init)
            localStorage.setItem('check-exi', 'yes')
            window.location.href = `/book/${bookData.slug}`
        }

    }
    const handleRemoveFavorite = () => { 

        
            
            let userData = localStorage.getItem('user-data-book')
            let before = JSON.parse(userData)
            for(let i = 0; i < before.length; i++){
                 if(before[i].title === bookData.title){
                    let beforeSlice = before.slice(0, i);
                    let afterSlice = before.slice(i+1, before.length);
                    let conc = beforeSlice.concat(afterSlice);
                    console.log(conc)
                    before = conc
                    let after = JSON.stringify(before)
                    localStorage.setItem('user-data-book', after)
                    localStorage.setItem('check-exi', 'no')
                    window.location.href = `/book/${bookData.slug}`
                }
            }
    }
    
    
  return (
    <div>
        
        <Container>
        {book?.map((item) => (
            <div className='article-section' key={item?.id}>
                <Row>
                      
            {item?.attributes?.image?.data?.map((img) => (
                <Col className='' key={img?.id}>
                <img  style={{width:"20rem", height:'30rem'}} alt={item?.attributes?.title} src={api + img?.attributes?.url} />
                </Col>
            ))}
            
            <Col className='article-header'>

            <h1 >{item?.attributes?.title}</h1>
            <p> by {item?.attributes?.author}</p>
            {[item?.attributes?.category?.data]?.map((cateName) => (
                
                <small key={cateName?.id}>Category: {cateName?.attributes?.name}</small>
                
            ))}
            
            <div className='bottom'>
            {localStorage.getItem('token') !== null ?
            localStorage.getItem('check-exi') === 'no' ? <div><CButton color="dark" onClick={handleFavorite}><i className="fa-regular fa-heart add"></i></CButton> <CButton href={`/read/${slug}`} color="dark">Read</CButton> </div> : <div><CButton color="dark" onClick={handleRemoveFavorite}><i className="fa-solid fa-heart rem"></i></CButton> <CButton href={`/read/${slug}`} color="dark">Read</CButton></div>
            : <h5>It looks like you're not a member, in order to read this book you need to <Link to='/login'>login</Link>.</h5>}
            </div>
            </Col>
            </Row>
            <div className='summary-section'>
            <h2>Summary</h2>
            <p>{item?.attributes?.summary}</p>
            </div>

            </div>
        ))}
        </Container>
    </div>
  )
    
}

export default Article