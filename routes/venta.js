const express = require('express');
const router = express.Router();
const { cventa, rventa, rventabyidAsesor} = require("../middlewares/venta");
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");

router.post('/crear-venta', cventa, (req, res) => {
    res.json();
});

router.get('/rventa', rventa, (req, res) => {
    res.json();
});


router.get('/rventabyid/:id', rventabyidAsesor, (req, res) => {
    res.json();
});

module.exports = router; 