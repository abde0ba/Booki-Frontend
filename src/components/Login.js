import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Login.css'

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const api = 'http://35.180.87.223:1337';

  useEffect(() => {
    let navId = document.getElementById('navbar-id')
    if(navId){
      navId.style.display = 'none';
    }

    
  }, [])
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    await axios
      .post(`${api}/api/auth/local/`, {
        identifier: email,
        password: password,
      })
      .then(response => {
      
        console.log(response.data.id)
        localStorage.setItem('token', response.data.jwt)
        let parsed = response?.data?.user?.userdata
        console.log(parsed)
        if(parsed !== undefined){
          localStorage.setItem('user-data-book', parsed)
          window.location.href = "/dashboard"
        
        } else if(parsed === undefined){
          window.location.href = "/dashboard"
        }
        
        
        
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
    }
  return (
    <div className='login-section'>
      <Row>
        <Col lg={1} md={1}>
          <Link className='back-btn' to='/'><i className="fa-sharp fa-solid fa-arrow-left-long"></i></Link>
        </Col>
        <Col lg={10} md={10}>
        <div className="login-form-bd">
        <div className="form-wrapper">
          <div className="form-container">
          <h1>Login</h1>
          <form>
          <div className="form-control">
            <input 
              type='email'
              value={email}
              onChange={(e) => { setEmail(e.target.value)}}
              required
            />
            <label> Email</label>
          </div>
          <div className="form-control">
            <input 
              type='password'
              value={password}
              onChange={(e) => { setPassword(e.target.value)}}
              required
            />
            <label> Password</label>
          </div>
            <button
                className="login-btn"
                type='submit'
                onClick={handleSubmit}
              >Login</button>
            <p className="text">Don't have an account? <Link to='/sign-up'> Register</Link></p>
          </form>
        </div>
        </div>
        </div>
        </Col>
        </Row>
    </div>
  )
}

export default Login