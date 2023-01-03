import './styles/Navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../Logo1.png'
const Navbar = () => {
    return(
    <nav id='navbar-id' className='navbar-section'>
        <Link id='logo' to='/'><img src={Logo} width={200} alt='Booki' /></Link>
        <ul className='nav-icon-list'>
            <li><Link to='/'><i className="fa-sharp fa-solid fa-house"></i>Home</Link></li>
            <li style={{display:'none'}} id='profile-nav'><Link to='/dashboard'><i className="fa-solid fa-user"></i>dashboard</Link></li>
            <li><Link to='/favorite'><i className="fa-solid fa-bookmark"></i>Favorite</Link></li>
            <li><Link to='/search'><i className="fa-solid fa-magnifying-glass"></i>Search</Link></li>
        </ul>
        <ul className='nav-links'>
            <Link to='/login' id='login-nav'>
                <li>
                Login
                </li>
            </Link>
            
            <Link to='/sign-up' id='signup-nav' className='theme-btns'>
                <li>
                Signup
                </li>
            </Link>
            
        </ul>
        <ul className='bottom-nav'>
        <li>
            <Link to='/about'>
                About
            </Link>
        </li>
            <p>© Copyright Booki, All rights reserved.</p>
        </ul>
    </nav>
    )
}

export default Navbar
