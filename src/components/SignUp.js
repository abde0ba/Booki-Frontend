import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Login.css'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
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
      .post(`${api}/api/auth/local/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data);
        //localStorage.setItem('token', response.data.jwt)
        navigate('/login')
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
            <h1>Sign up</h1>
            <form>
            <div className="form-control">
              <input 
                type='text'
                value={username}
                onChange={(e) => { setUsername(e.target.value)}}
                required
              />
              <label> Username</label>
            </div>
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
                >Sign up</button>
              <p className="text">You aleady have an account? <Link to='/login'> Login</Link></p>
            </form>
          </div>
          </div>
          </div>
          </Col>
          </Row>
      </div>
    )
}

export default SignUp