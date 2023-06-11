const express = require("express");
const router = express.Router();
const { obtenerResenias } = require('../middlewares/resenias')

router.get('/reviews', obtenerResenias, (req, res) => {
    res.json();
});

router.post('/agregarResena', AgregarResenias, (req, res) => {
    res.json();
});


module.exports = router;