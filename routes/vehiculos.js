const express = require('express');
const router = express.Router();
const { obtenerVehiculos, agregarVehiculos , actualizarVehiculo, eliminarVehiculos  } = require("../middlewares/vehiculos");

router.get('/catalogo', obtenerVehiculos, (req, res) => {
    res.json();
});

router.post('/agregarVehiculo', agregarVehiculos, (req, res) => {
    res.json();
});

router.post('/modificarVehiculo', actualizarVehiculo, (req, res) => {
    res.json();
});

router.post('/eliminarVehiculo', eliminarVehiculos, (req, res) => {
    res.json();
});
module.exports = router;