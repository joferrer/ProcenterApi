const express = require("express");
const router = express.Router();
const { upload, AWS } = require("../awsConfig/bucket");
const uuid = require("uuid");
const {
  consultarCatalogo,
  desactivarDisponible,
  actualizarPlaca,
  agregarImagen,
} = require("../middlewares/catalogo");
const keys = require("../awsConfig/aws-credencial.json");
const fs = require("fs");

const { formatoCatalogo } = require("../helpers/formatoCatalogo");
const { log } = require("console");

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

  return res.status(200).send("actualizado");
});

// Ruta para subir la imagen a Amazon S3
router.post("/subir-imagen", upload.array("image"), async (req, res) => {
  const s3 = new AWS.S3();

  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ estado: false, mensaje: "No se ha proporcionado ninguna imagen" });
  }

  let imagenes = [];

  try {
    // Iterar sobre las imágenes subidas
    for (const file of req.files) {
      const params = {
        Bucket: keys.bucketName,
        Key: `${uuid.v1()}.jpg`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Subir cada imagen a S3
      const data = await s3.upload(params).promise();
      imagenes.push(data.Location);
    }
    await agregarImagen(imagenes, req.body.id);
    return res.status(200).send({ estado: true, mensaje:"Imágenes subidas exitosamente"});
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ estado: false, mensaje: "Error al subir las imágenes a S3" });
  }
});

module.exports = router;
