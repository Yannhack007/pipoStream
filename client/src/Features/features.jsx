import React from 'react'
import './features.css'
import HeartEmoji from '../assets/heartemoji.png'
import Glasses from '../assets/glasses.png'
import Humble from '../assets/humble.png'
import GroupCall from '../assets/grop.png'
import VideoCall from '../assets/videocall.png'
import FunnyCall from '../assets/funnycall.png'
import Custom from '../assets/Custom-effect.png'
import Profile from '../assets/profile-management.png'
import Encryption from '../assets/encryption.png'
import User from '../assets/user.png'
import Notif from '../assets/Push-notification.png'
import Girl from '../assets/girl.png'
import Card from '../Card/Card'


const features = () => {
  return (
    <div className="features">
        <div className="f-gauche">
            <span>Enjoy Amazing</span><br/>
            <span>Video Calls</span>
            <img src={Glasses} alt="" />
            <img src={HeartEmoji} alt="" />
            <img src={Humble} alt="" />
          <div className="effect2 blue"></div>
          <div className="texte">
            <span>Some</span>
            <span>Features</span>
            <img src={Girl} alt="" className='girl' />
          </div>
        </div>
        <div className="f-droite">
          <div className="heart">
              <Card
                emoji={VideoCall}
                heading={'Video Call '}
                detail={"Recording"}
                />
          </div>
          <div className="glass">
              <Card
                emoji={FunnyCall}
                heading={'Share the Moment'}
                detail={"of Your Life"}
                />
          </div>
          <div className="humble">
              <Card
                emoji={GroupCall}
                heading={'Group Video'}
                detail={" Chat"}
                />
          </div>

          <div className="roue">
            <div className="main-circle">
              <div className="backcircle bg-circle-blue"></div>
              <div className="backcircle bg-circle-yellow"></div>


              <div className="circle">
                
                <img src={User} alt="" />
                <span>User Profle</span>
              </div>
              <div className="circle">
                
                <img src={Notif} alt="" />
                <span>Push Notification</span>
              </div>
              <div className="circle">
               
                <img src={Encryption} alt="" />
                <span>Encryption</span>
              </div>
              <div className="circle">
                
                <img src={Profile} alt="" />
                <span>Profile Management</span>
              </div>
              <div className="circle">
                <img src={Custom} alt="" />
                <span>Custom Effect</span>
              </div>
            </div>
          </div>
        </div>
    </div>

  )
}

export default features