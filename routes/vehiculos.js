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

router.post('/cvehiculo', cvehiculo, (req, res) => {
    res.json();
});

router.get('/rvehiculo', rvehiculo, (req, res) => {
    res.json();
});

router.get('/rvehiculobyid/:idveh', rvehiculobyid, (req, res) => {
    res.json();
});

router.put('/uvehiculo/:idveh', uvehiculo, (req, res) => {
    res.json();
});
router.delete('/dvehiculo/:idveh', dvehiculo, (req, res) => {
    res.json();
});


module.exports = router;