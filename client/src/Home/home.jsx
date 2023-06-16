import React from 'react';
import { Link } from 'react-router-dom';
import FloatingDiv from '../FloatingDiv/FloatingDiv';
import Vector1 from '../assets/Vector1.png';
import Vector2 from '../assets/Vector2.png';
import Boy from '../assets/boy.png';
import Crown from '../assets/crown.png';
import Github from '../assets/github.png';
import CoolEmoji from '../assets/glassesimoji.png';
import Instagram from '../assets/instagram.png';
import LinkedIn from '../assets/linkedin.png';
import Yess from '../assets/thumbup.png';
import './home.css';

const home = () => {
  return (
    <div className="home">
        <div className="h-gauche">
        <div className="h-name">
            <span>MeetUp</span>
            <span>Let' s revolutionize video call world!</span>
        </div>
        <button className='button h-button'>
            <Link to="/Signin" className='Link'>Get Started</Link>
            </button>
        <div className="h-icons">
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer"><img src={Github} alt="" srcSet="" /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><img src={LinkedIn} alt="" srcSet="" /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src={Instagram} alt="" srcSet="" /></a>    
        </div>
        </div>

        <div className="h-droite">
            <img src={Vector1} alt="" srcSet="" />
            <img src={Vector2} alt="" srcSet="" />
            <img src={Boy} alt="" srcSet="" />
            <img src={CoolEmoji} alt="" srcSet="" />
            <div className='floating'>
                <FloatingDiv image={Crown} text1="Best" text2="Video Call App"/>
            </div>
            <div className="floating2">
            <FloatingDiv image={Yess} text1="Best Design" />
            </div>

            <div className="effect"></div>
            <div className="effect2"></div>
        </div>
    </div>
  )
}

export default home