const express = require("express");
const router = express.Router();
const {
  consultarCatalogo,
  desactivarDisponible,
  actualizarPlaca
} = require("../middlewares/catalogo");
const { formatoCatalogo } = require("../helpers/formatoCatalogo");

// Desde firestore
router.get("/catalogo", consultarCatalogo, (req, res) => {
  try {
    res.json(req.autos);
  } catch (error) {
    return console.log(error);
  }
});
//Desactivar Vehiculo
router.post("/desactivar-vehiculo/:id", desactivarDisponible, (req, res) => {
  if (res.estado) {
    return res.status(200).send({
      estado: res.estado,
      mensaje: `${res.message}`,
    });
  } else {
    return res.status(400).send({
      estado: res.estado,
      mensaje: `${res.message}`,
    });
  }
});

router.post("actualizarPlaca", actualizarPlaca, (req, res) => {
    const { idVehiculo, Placa } = req.body;
    //validar que la placa no exista
    
    return res.status(200).send("actualizado")
})

module.exports = router;
