require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {funcionPrueba} = require('./routes/Vehiculos/prueba');



const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


app.get('/', (req,res)=>{
    res.send("Bienvenido a ProcenterAPI.");
})

app.listen(PORT, ()=>{
    console.log(`Sevidor corriendo en el puerto ${PORT}`);
    funcionPrueba();
})





