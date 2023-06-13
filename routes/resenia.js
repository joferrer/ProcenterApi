const express = require("express");
const router = express.Router();
const { obtenerResenias, AgregarResenias, desactivarReseña, activarReseña } = require('../middlewares/resenias')

router.get('/reviews', obtenerResenias, (req, res) => {
    res.json();
});

router.post('/agregarResena', AgregarResenias, (req, res) => {
    res.json();
});

router.delete('/desactivarResena/:id', desactivarReseña, (req, res) => {
    res.json();
});

router.post('/activarResena/:id', activarReseña, (req, res) => {
    res.json();
});

module.exports = router;