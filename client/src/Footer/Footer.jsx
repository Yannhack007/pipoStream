import React from 'react'
import './Footer.css'
import Wave from '../assets/wave.png'
import Facebook from '../assets/Facebook.png'
import Fiverr from '../assets/fiverr.png'
import Upwork from '../assets/Upwork.png'
import Shopify from '../assets/Shopify.png'

const Footer = () => {
  return (
    <div className="footer">
        <img src={Wave} alt="" className='wave'/>
        <div className="footer-content">
            <span>Copyright 2023</span>
            <div className="icons">
                <img src={Facebook} alt="" />
                <img src={Fiverr} alt="" />
                <img src={Upwork} alt="" />
                <img src={Shopify} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Footer