const express = require("express");
const router = express.Router();
const { obtenerLinks } = require('../middlewares/asesorlinks')

router.get('/asesor-links', obtenerLinks , (req, res) => {
    res.json();
  });

module.exports = router;