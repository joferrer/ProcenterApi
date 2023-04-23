require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {} = require('./app');
const path = require('path')

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
app.use(require('./routes/vehiculos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/catalogo'));

//Vista para el back (temporal)

app.use(express.static(__dirname));

const history = require('connect-history-api-fallback');
app.use(history());
//Vista para el back (temporal)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  
    console.log(`Servidor corriendo en localhost:${PORT}`);
})