const express = require('express');
const router = express.Router();
const { consultarCatalogo } = require('../middlewares/catalogo');
const { formatoCatalogo } = require('../helpers/formatoCatalogo');

// Desde firestore
router.get('/catalogo',consultarCatalogo, (req,res) => {
    try {
        res.json(req.autos);
    } catch (error) {
        return console.log(error)
    }
});

module.exports = router;