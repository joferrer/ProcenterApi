require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {funcionPrueba} = require('./routes/Vehiculos/prueba');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));



const admin = require("firebase-admin");
const credentials = require("./firebase/key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
const db = admin.firestore();


//Rutas del Proyecto
//Inicial
app.get('/', (req,res)=>{
    res.send("Bienvenido a ProcenterAPI.");
})


//Vehiculo () => responde con json del raio maquin
app.get('/vehiculos', async(req, res) => {
    
    try {
        const userRef = db.collection("vehiculos");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach ( doc => {
            responseArr.push(doc.data());
        }); 
        res.send(responseArr);
        console.log("Houdston lo hemos logrado");
    }
    catch (error) {
        res.send(error);
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    funcionPrueba();
    console.log(`Ve a la ruta de vehiculos en localhost:${PORT}/vehiculos`);
})





