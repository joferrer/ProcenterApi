require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {funcionPrueba} = require('./routes/Vehiculos/prueba');
const {} = require('./app');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));



const admin = require("firebase-admin");
const credentials = require("./firebase/key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

//arreglar

//routes
app.use(require('/','./routes/index'));
app.use(require('/','./routes/Vehiculos/vehiculos'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    funcionPrueba();
    console.log(`Ve a la ruta de vehiculos en localhost:${PORT}/vehiculos`);
})





