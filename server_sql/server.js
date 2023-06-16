const express=require('express')
const mysql =require('mysql')
const cors=require('cors')

const app=express()
app.use(cors());
app.use(express.json())
const db=mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: 'meetup'
});
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('my sql connecte...');
})

app.post('/meetup', (req, res)=>{
    const sql ="INSERT INTO utilisateur (`Nom`, `Prenom`, `matricule`, `password`) VALUES (?)";
    const values=[
        req.body.Nom,
        req.body.Prenom,
        req.body.matricule,
        req.body.password
    ]

    db.query(sql,[values],(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })

})
app.get('/getuser/:matricule', (req, res) => {
    matricule=req.params.matricule;
    let sql = "SELECT * FROM utilisateur WHERE matricule = ?" ;
  
    db.query(sql, [matricule], (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des informations du client :', err);
        return res.status(500).json({ error: 'Erreur lors de la récupération des informations du client' });
      }
  
      if (result.length > 0) {
        const clientInformation = result[0];
        return res.json(clientInformation);
        
      } else {
        return res.status(404).json({ error: 'Client non trouvé' });
      }
    });
  });

app.listen(8081, ()=>{
    console.log("Listening...");
})

