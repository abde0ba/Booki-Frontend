import './App.css';
import Navbar from './components/Navbar';
import {Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import Article from './components/Article';
import Favorite from './components/Favorite';
import Read from './components/Read';
import Search from './components/Search';
import About from './components/About';

function App() {
  const api = 'http://35.180.87.223:1337'
  useEffect(() =>{
    let pr = document.getElementById('profile-nav');
    let log = document.getElementById('login-nav');
    let sign = document.getElementById('signup-nav');
    if(localStorage.getItem('token')){
      
      pr.style.display = 'block';
      log.style.display = 'none';
      sign.style.display = 'none';
    } else {
      pr.style.display = 'none';
      log.style.display = 'block';
      sign.style.display = 'block';
    }
    const tk = localStorage.getItem('token')
    
    const getData = async () => {
      await fetch(`${api}/api/users/me`, {
        headers: { Authorization: `Bearer ${tk}` },
      });
      //console.log(response.json())
    }
    if(tk){
      getData();
    }
    
  }, [])
  return (
    <div className="App">
      <Router>
      
        <Row>
          <Col md='2' className='nav-container'>
            <Navbar />
          </Col>
          <Col  md='9'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/book/:slug' element={<Article />} />
            <Route path='/search' element={<Search />} />
            <Route path='/about' element={<About />} />
          </Routes>
          </Col>
        </Row>
        <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/read/:slug' element={<Read />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
