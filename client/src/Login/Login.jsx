import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';
import './Login.css'


const Login = ()=>{

    const [matricule,setMatricule] = useState("");
    const [mdp,setMdp] = useState("");


    const socket = useSocket();


    const navigate = useNavigate();
  
    const handleSubmitForm =useCallback((e) =>{
        e.preventDefault();
        socket.emit('authentification', {matricule,mdp});
        console.log({
            matricule,
            mdp,

        });
    },
    [matricule, mdp,socket]
    );
    const handleAuthentified = useCallback(
        (rang) =>{
        console.log('il est authentifie il est le',rang,'client');
        
        
        navigate(`/Starting`);
     },
     [navigate])
    useEffect(() =>{
        socket.on('authentified', handleAuthentified);
        return() =>{
            socket.off('authentified', handleAuthentified)
        }
    }, [socket, handleAuthentified]);


    return(
        <div className='login'>
            <h1 className='login-title'>Login</h1>
            <form onSubmit={handleSubmitForm} className="login-form">
                <div className="log-champ">
                    <label htmlFor='matricule' className='matricule-label'>Matricule</label>
                    <input 
                    type="text" 
                    id='matricule' 
                    value={matricule} 
                    onChange={e => setMatricule(e.target.value)}
                    />
                    <label htmlFor='mdp' className='mdp-label'>Password</label>
                    <input type="password"
                    id='mdp'
                    value={mdp} 
                    onChange={e => setMdp(e.target.value)}
                    />
                </div>
                <button className='log-button'>log in</button>
                <div className="log-question">
                    <span>Don't have an account?</span>
                    <span>
                        <Link className='LINK' to="/Signin">Sign In</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
export default Login