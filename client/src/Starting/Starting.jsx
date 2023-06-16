import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import call from '../assets/call.png';
import LOGO from '../assets/logo.png';
import { useSocket } from '../context/SocketProvider';


import "./Starting.css";


const Starting = () => {

    


    const [remoteMatricule,setRemoteMatricule] = useState("");
    
    


    const socket = useSocket();


    const navigate = useNavigate();
  
    const handleSubmitForm =useCallback((e) =>{
        e.preventDefault();
        console.log(
            'Je veux appeler le :', remoteMatricule

        );
        socket.emit('search:remote', {remoteMatricule});
    },
    [remoteMatricule,socket]
    );


    const handleRemoteOffline =useCallback((remoteMatricule) =>{
       alert('desole mais l\'utilisateur, que vous tentez d\'appeler est indisponible.',remoteMatricule);

       
    },
    []
    );

    const handleJoinRoom = useCallback(
        (data) =>{
            const {a,room} = data;
        console.log(a,room);
        
        navigate(`/room/${room}`);
     },
     [navigate])
    useEffect(() =>{
        socket.on('room:join', handleJoinRoom);
        return() =>{
            socket.off('room:join', handleJoinRoom)
        }
    }, [socket, handleJoinRoom]);

    

    useEffect(() =>{
        socket.on('remoteOffline', handleRemoteOffline);
        return() =>{
            socket.off('remoteOffline', handleRemoteOffline)
        }
    }, [socket, handleRemoteOffline]);


  return (
    <div className="starting">
        <div className="s-gauche">
            <div className="logo">
                <img src={LOGO} alt="" srcSet="" />
            </div>
            <h1 className='starting-title'>WelCome!</h1>
            <div className="recent-call">
                <span>Recent Call(s)</span>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="effect"></div>
            <div className="call-center">
            <span >I WANT TO CALL</span>
                <input type="text" 
                id='remoteMatricule' 
                value={remoteMatricule} 
                onChange={e => setRemoteMatricule(e.target.value)}/>
                    
                <Link to="/room/:roomId"><button className='call-button' onClick={handleSubmitForm}><img src={call} alt="" srcSet="" /></button></Link>
                
            </div>
        </div>
        <div className="s-droite">
            <div className="contacts">
                <span>Contacts</span>
                <span className='search'>Search</span>
                <input type="search" name="" id="" />
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    </div>
  )
}

export default Starting