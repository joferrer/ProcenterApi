const express = require('express');
const router = express.Router();
const { cventa, rventa, rventabyid, uventa, dventa, crearVenta} = require("../middlewares/venta");
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");

router.post('/venta', cventa, (req, res) => {
    res.json();
});

router.get('/rventa', rventa, (req, res) => {
    res.json();
});


router.get('/rventabyid/:id', rventabyid, (req, res) => {
    res.json();
});
router.put('/uventa/:id', uventa, (req, res) => {
    res.json();
});
router.delete('/dventa/:id', dventa, (req, res) => {
    res.json();
});

router.post('/registrar-venta', crearVenta, (req, res) => {
    res.json();
});
module.exports = router;