const express = require('express');
const router = express.Router();
const {adquisicionVehiculos,obtenerAdquisicion,obtenerAdquisicionById,desactivarAdquisicion} = require("../middlewares/adquisiciones");

router.post('/agregar-adquisicion', adquisicionVehiculos, (req, res) => {
    res.json();
});

router.get('/adquisiciones', obtenerAdquisicion, (req, res) => {
    res.json();
});

router.get('/adquisicion/:id', obtenerAdquisicionById, (req, res) => {
    res.json();
});
//Desactivar Adquisicion
router.post("/desactivar-adquisicion/:id", desactivarAdquisicion, (req, res) => {
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