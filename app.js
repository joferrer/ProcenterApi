require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {funcionPrueba} = require('./routes/Vehiculos/prueba');
const {} = require('./app');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));


//Global Variables
app.use((req, res, next) => {
  app.locals.db = req.db;
  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/Vehiculos/vehiculos'));
app.use(require('./routes/Usuarios/usuarios'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    funcionPrueba();
    console.log(`Ve a la ruta de vehiculos en localhost:${PORT}/vehiculos`);
})





