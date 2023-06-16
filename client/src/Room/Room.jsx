import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import background from "../assets/bg.png";
import callEnd from "../assets/callend.png";
import { useSocket } from '../context/SocketProvider';
import peer from '../service/peer';
import './Room.css';


const RoomPage = () => {
    const socket =useSocket();
    const [remoteSocketId , setRemoteSocketId] = useState(null);
    const [mystream , setMyStream] = useState();
    const [remoteStream , setRemoteStream] = useState();

    

    const handleUserJoined = useCallback(({email,id}) =>{
        console.log('presence dans la room');
        console.log(id);
        setRemoteSocketId(id);

    },[]);

    const handleCallUser = useCallback(async() =>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        const offer =  await peer.getOffer();
        console.log("ekier massah 1", offer);
        socket.emit("user:call", {to: remoteSocketId, offer});
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleINcommingCall = useCallback(
        async(from,offer) => {
            console.log("from est bizarre",from)
            setRemoteSocketId(from.from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true,
            });
        setMyStream(stream);
        console.log("ekier massah 2",from.offer,from);
        const ans = await peer.getAnswer(from.offer);
        socket.emit("call:accepted",{ to: from.from,ans});
    }, 
    [socket]
    );

    const sendStreams = useCallback(() =>{
        for(const track of mystream.getTracks()){
            peer.peer.addTrack(track, mystream);
            console.log("Bon jusqu'ici tout va bien")
        }
    }, [mystream]);

    const handleCallAccepted = useCallback((from,ans) =>{
        console.log("perfect",from);
        peer.setLocalDescription(from.ans);
        console.log("appel accepté...");
        sendStreams();
        
    },
    [sendStreams]
    );


    const handleNegoNeeded = useCallback( async() =>{
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed',{offer, to: remoteSocketId});
    },[remoteSocketId,socket]);

    useEffect(() => {
        peer.peer.addEventListener('negociationneeded',handleNegoNeeded);
        return () =>{
            peer.peer.removeEventListener('negociationneeded',handleNegoNeeded);
        }
        
    },[handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(async ({from,offer}) =>{
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done',{ to:from, ans});

    }, 
    [socket]
    );
    const handleNegoNeedFinal = useCallback(async ({ans})=>{
        await peer.setLocalDescription(ans);

    },[]);

    useEffect(() =>{
            console.log("Attends un peu");
            peer.peer.addEventListener('track', async ev =>{
            console.log("euuh ici le trackId...",ev.track.id,ev.streams[0]);
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!!");
            setRemoteStream(remoteStream[0]);
            console.log("Le remote est setté.");
        });

    },[]);



    useEffect(() =>{
        socket.on("user:joined", handleUserJoined);
        socket.on('incomming:call',handleINcommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed',handleNegoNeedIncomming);
        socket.on('peer:nego:final', handleNegoNeedFinal);

        
        return() => {
        
            socket.off("user:joined", handleUserJoined);
            socket.off("incomming:call",handleINcommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed',handleNegoNeedIncomming);
            socket.off('peer:nego:final', handleNegoNeedFinal);


        };

    }, [socket, handleUserJoined, handleINcommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal]);
    
    return(
        <div className='room'>
            <img src={background} alt="" className='bg-room'/>
            
            {
                mystream && (
                <div className='mavideo'>
                    <ReactPlayer 
                    playing 
                    height="400px" 
                    width="600px" 
                    url={mystream
                    } />
                </div>
            )}
            {
                remoteSocketId && (
                <div className='uservideo'>

                    <ReactPlayer
                    playing  
                    className="uservideo"
                    url={remoteStream
                    } />
                    
                </div>
                
            )}
            <div className="room-bout">
            {mystream && <button onClick={sendStreams} className='sendStream'>Send Stream</button>  }
            {remoteSocketId && <button onClick={handleCallUser} className='call-decrocher'><img src={callEnd} alt="" srcSet="" className='callEnd end' /></button>}
            </div>
            
        </div>
        
    )
}
export default RoomPage;