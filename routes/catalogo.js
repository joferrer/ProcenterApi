const express = require('express');
const router = express.Router();
const { consultarCatalogo , desactivarDisponible} = require('../middlewares/catalogo');
const { formatoCatalogo } = require('../helpers/formatoCatalogo');

// Desde firestore
router.get('/catalogo',consultarCatalogo, (req,res) => {
    try {
        res.json(req.autos);
    } catch (error) {
        return console.log(error)
    }
});
//Desactivar Vehiculo
router.post('/desactivar-vehiculo/:id', desactivarDisponible ,(req, res) => {
   return res.status(400).send(
    {   
        "estado": res.estado, 
        "mensaje": `${res.message}`}
    );
});

module.exports = router;