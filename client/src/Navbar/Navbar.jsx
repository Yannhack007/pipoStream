import React from 'react'
import { Link } from 'react-router-dom'
import Toggle from '../Toggle/Toggle'
import logo from "../assets/logo.png"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="entete">
        <div className="gauche">
            <img src={logo} alt="" srcSet="" />
            <div className="name">
                <span>Meet</span>
                <span>Up</span>
            </div>
            <Toggle/>
        </div>

        <div className="droite">
            <div className="onglets">
                <ul>
                    <li>Home</li>
                    <li>Features</li>
                    <li>Our Team</li>
                   
                </ul>
            </div>
            <button className="button">
                <Link to="/Login" className='Link'>Try Now</Link>
            </button>
        </div>
    </div>
  )
}

export default Navbar