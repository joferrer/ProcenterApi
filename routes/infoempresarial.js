const express = require("express");
const router = express.Router();
const { obtenerInfoEmpresarial, actualizarInfoEmpresarial } = require('../middlewares/infoempresarial')

router.get('/info-empresa', obtenerInfoEmpresarial , (req, res) => {
  res.json();
});

router.put('/actualizar-info-empresa', actualizarInfoEmpresarial , (req, res) => {
  res.json();
});

module.exports = router;