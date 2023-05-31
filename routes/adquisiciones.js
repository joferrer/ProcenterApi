const express = require('express');
const router = express.Router();
const {adquisicionVehiculos,obtenerAdquisicion,obtenerAdquisicionById,desactivarAdquisicion} = require("../middlewares/adquisiciones");
const axios = require("axios");
const { PORT } = require('../app')

router.post('/agregar-adquisicion', adquisicionVehiculos, async (req, res) => {
    //axios actualizar catalogo
    // await axios.post(`http://localhost:${4000}/actualizar-catalogo`);
    res.json();
});

router.get('/adquisiciones', obtenerAdquisicion, (req, res) => {
    //axios actualizar catalogo
    res.json();
});

router.get('/adquisicion/:id', obtenerAdquisicionById, (req, res) => {
  //axios actualizar catalogo
    res.json();
});
//Desactivar Adquisicion
router.post("/desactivar-adquisicion/:id", desactivarAdquisicion, (req, res) => {
    //axios actualizar catalogo
    if (res.estado) {
      return res.status(200).send({
        estado: res.estado,
        mensaje: `${res.message}`,
      });
    } else {
      return res.status(400).send({
        estado: res.estado,
        mensaje: `${res.message}`,
      });
    }
  });

module.exports = router;