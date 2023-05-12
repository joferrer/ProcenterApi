const express = require('express');
const router = express.Router();
const { obtenerVehiculos, agregarVehiculos , actualizarVehiculo, eliminarVehiculos, cvehiculo , rvehiculo, rvehiculobyid, uvehiculo, dvehiculo  } = require("../middlewares/vehiculos");

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

router.post('/cvehiculos', cvehiculo, (req, res) => {
    res.json();
});

router.get('/rvehiculos', rvehiculo, (req, res) => {
    res.json();
});

router.get('/rvehiculosbyid/:id', rvehiculobyid, (req, res) => {
    res.json();
});

router.put('/uvehiculos/:id', uvehiculo, (req, res) => {
    res.json();
});
router.delete('/dvehiculos/:id', dvehiculo, (req, res) => {
    res.json();
});


module.exports = router;