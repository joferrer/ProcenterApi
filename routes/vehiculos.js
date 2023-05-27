const express = require('express');
const router = express.Router();
const { crearVehiculo, obtenerVehiculos, obtenerVehiculoById, actualizarVehiculo, eliminarVehiculo}= require("../middlewares/vehiculos");


router.post('/agregar-vehiculo', crearVehiculo, (req, res) => {
    res.json();
});

router.get('/vehiculos', obtenerVehiculos, (req, res) => {
    res.json();
});

router.get('/vehiculo/:id', obtenerVehiculoById, (req, res) => {
    res.json();
});

router.put('/vehiculo/:id', actualizarVehiculo, (req, res) => {
    res.json();
});
router.delete('/vehiculo/:id', eliminarVehiculo, (req, res) => {
    res.json();
});


module.exports = router;