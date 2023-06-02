const express = require("express");
const router = express.Router();
const { obtenerInfoEmpresarial } = require('../middlewares/infoempresarial')

router.get('/info-empresa', obtenerInfoEmpresarial , (req, res) => {
  res.json();
});

module.exports = router;