import React from 'react'
import logo from '../images/logo.png'
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="container">
                <div className="nav-container">
                    <img className='nav-logo' src={logo} alt='logo' />
                    <div className="nav-links">
                        <NavLink className='nav-link' to='/meals'>Meals</NavLink>
                        <NavLink className='nav-link' to='/savedMeals'>Saved List</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar