const express = require('express');
const router = express.Router();
const { db } = require('../../firebase/providerFirestore');

router.get('/getVehicles', async(req, res) => {
    try {
        const userRef = db.collection("vehiculos");
        const response = await userRef.get();
        let responseArr = [];

        response.forEach ( doc => {
            responseArr.push(doc.data());
        }); 
        res.send(responseArr);
    }
    catch (error) {
        res.send(error);
    }
});

router.get('/addVehicles', async(req, res) => {
    try {
        const userRef = db.collection("vehiculos");
        const response = await userRef.get();
        let responseArr = [];

        response.forEach ( doc => {
            responseArr.push(doc.data());
        }); 
        res.send(responseArr);
    }
    catch (error) {
        res.send(error);
    }
});

module.exports = router;