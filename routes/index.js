const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("Bienvenido a ProcenterAPI.");
})

module.exports = router;