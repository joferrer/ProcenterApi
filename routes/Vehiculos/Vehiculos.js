const express = require('express');
const router = express.Router();

const db = admin.firestore();

app.get('/vehiculos', async(req, res) => {
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

app.put('/vehiculos:id', () => {
    return "el pepe modifico el vehiculo"
});

module.exports = router;