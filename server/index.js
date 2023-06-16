const {Server} = require("socket.io");



const io = new Server(8000,{
    cors:true,
});

const matriculeToSocketIdMap =new Map();
const socketidToMatriculeMap = new Map();
const user = new Map();
const classement = new Map();
const matriculeToSocket = new Map();

io.on('connection', socket =>{
    console.log('socket connecté',socket.id);
    
    socket.on("room:join", (data)  => { 
        const {matricule, room} = data;
        matriculeToSocketIdMap.set(matricule,socket.id);
        socketidToMatriculeMap.set(socket.id, matricule);
        io.to(room).emit('user:joined',{matricule, id: socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join",data);

    });
    const axios = require('axios');

// Fonction pour récupérer les informations du client à partir du serveur
async function getClientInformation(matricule) {
  try {
    const response = await axios.get('http://localhost:8081/getuser/' + matricule);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du client :', error.response.data);
    throw new Error('Erreur lors de la récupération des informations du client');
  }
}





   socket.on("authentification", (data)  => { 
        const {matricule, mdp} = data;
        console.log(matricule);
        getClientInformation(matricule)
           .then(clientInformation => {
          console.log('Informations du client :', clientInformation);
          if(mdp==clientInformation.password){ user.set(matricule,socket.id);
            const rang = user.size;
            const tmp = classement.size+1;
            classement.set(matricule,tmp);
            matriculeToSocketIdMap.set(matricule,socket.id);
            matriculeToSocket.set(matricule,socket);
            socketidToMatriculeMap.set(socket.id, matricule);
            io.to(socket.id).emit("authentified",rang);
            }
        })
        .catch(error => {
          console.error(error);
          // Gérez l'erreur de récupération des informations du client
        });
        

    });
    
   


    socket.on("search:remote", (remoteMatricule)  => { 
        console.log('je cherche l\'utilisateu:',remoteMatricule.remoteMatricule);
        const correspondantexist = user.has(remoteMatricule.remoteMatricule);
        console.log('user',user);
        console.log('userRemoteMATRICUL',user.get(remoteMatricule.remoteMatricule));
        console.log('Est ce que cet utilisateur existe:',correspondantexist);
        const room = classement.get(socketidToMatriculeMap.get(socket.id));
        const matricule = socketidToMatriculeMap.get(socket.id);
        console.log('Mon matricule est:',matricule,'et je veux rejindre la room:',room);
        if (correspondantexist) {
            console.log('correspond en ligne appel possible');
            io.to(room).emit('user:joined',{matricule, id: socket.id});
            socket.join(room);
            io.to(socket.id).emit('room:join',{matricule,room});
            
            const remoteSocket = matriculeToSocket.get(remoteMatricule.remoteMatricule);
            io.to(room).emit('user:joined',{remoteMatricule, id: remoteSocket.id});
            remoteSocket.join(room);
            io.to(remoteSocket.id).emit('room:join',{remoteMatricule,room});
            
          } else {
            console.log('correspond deconnecte appel impossible');
            io.to(socket.id).emit("remoteOfflile");
            console.log(user);
          }
        
        

    });
    

    

socket.on('user:call', ({to, offer}) => {
    io.to(to).emit('incomming:call',{from: socket.id,offer});
}) ;
socket.on('call:accepted',({ to, ans}) =>{
    io.to(to).emit('call:accepted',{from: socket.id,ans});
});

socket.on('peer:nego:needed', ({to, offer}) =>{
    io.to(to).emit('peer:nego:needed',{from: socket.id,offer});
});

socket.on('peer:nego:done',({to, ans}) =>{
    io.to(to).emit('peer:nego:final',{from: socket.id,ans});
});
socket.on('disconnect',()=>{
    const a = socketidToMatriculeMap.get(socket.id);
    const b = socket.id;
    matriculeToSocketIdMap.delete(a);
    socketidToMatriculeMap.delete(socket.id);
    user.delete(a);
    classement.delete(a);
    console.log('Un Client s\'est deconnecte il s\'agit de :',a);
    matriculeToSocket.delete(a);

});

});

