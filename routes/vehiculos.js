const express = require('express');
const router = express.Router();
const { crearVehiculo, obtenerVehiculos, obtenerVehiculoById, actualizarVehiculo, eliminarVehiculo}= require("../middlewares/vehiculos");


router.post('/agregar-vehiculo', crearVehiculo, (req, res) => {
    res.json();
});

router.get('/vehiculos', obtenerVehiculos, (req, res) => {
    //axios actualizar catalogo
    res.json();
});

router.get('/vehiculo/:id', obtenerVehiculoById, (req, res) => {
    //axios actualizar catalogo
    res.json();
});

router.put('/vehiculo-actualizar/:id', actualizarVehiculo, (req, res) => {
    //axios actualizar catalogo
    res.json();
});

router.delete('/vehiculo-eliminar/:id', eliminarVehiculo, (req, res) => {
    //axios actualizar catalogo
    res.json();
});


module.exports = router;