const express = require('express');
const router = express.Router();
const { cventa, rventa, rventabyid, uventa, dventa, crearVenta} = require("../middlewares/venta");
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");

router.post('/crear-venta', cventa, (req, res) => {
    res.json();
});

router.get('/rventa', rventa, (req, res) => {
    res.json();
});


router.get('/rventabyid/:id', rventabyid, (req, res) => {
    res.json();
});
router.put('/uventa/:id', uventa, (req, res) => {
    res.json();c
});
router.delete('/dventa/:id', dventa, (req, res) => {
    res.json();
});

module.exports = router; 