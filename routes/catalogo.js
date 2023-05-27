const express = require('express');
const router = express.Router();
const { actualizarCatalogo } = require('../middlewares/catalogo');
const { formatoCatalogo } = require('../helpers/formatoCatalogo');

router.get('/catalogo',actualizarCatalogo, (req,res) => {
    try {
        let autos = [];
        req.autos.forEach(e => {
            autos.push(formatoCatalogo(e));
        });
        res.json(autos);

    } catch (error) {
        return console.log(error)
    }
});

module.exports = router;