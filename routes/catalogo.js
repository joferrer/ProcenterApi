const express = require("express");
const router = express.Router();
const { db } = require("../firebase/providerFirestore");
const uuid = require("uuid");
const {
  consultarCatalogo,
  desactivarDisponible,
  actualizarPlaca,
  agregarImagen,
  consultarCatalogoEcommerce,
  consultarImagenes,
} = require("../middlewares/catalogo");
//AZURE CREDENTIALS
const azure = require('azure-storage');
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
const sharp = require('sharp');
const { traerCatalogo } = require("../helpers/catalogo");
const { formatoCatalogo } = require("../helpers/formatoCatalogo");
const { id } = require("../schemas/SchemaVehiculo");

// Desde firestore
router.get("/catalogo", consultarCatalogo, (req, res) => {
  try {
    res.json(req.autos);
  } catch (error) {
    return console.log(error);
  }
});
//
router.get("/catalogo/:id", consultarCatalogo, (req, res) => {
  try {
    res.json(req.autos);
  } catch (error) {
    return console.log(error);
  }
});

router.get("/catalogoEcommerce", consultarCatalogoEcommerce, (req, res) => {
  try {
    res.json(req.autos);
  } catch (error) {
    return console.log(error);
  }
});


router.post("/actualizar-catalogo", async (req, res) => {
  try {
    const response = await traerCatalogo();
    const batch = db.batch();

    for (const vehiculo of response) {
      let insertVeh = formatoCatalogo(vehiculo);

      const docRef = db.collection("vehiculos").doc(insertVeh.id);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const existingData = docSnapshot.data();
        const mergedImagenes = mergeImagenes(existingData.imagenes, insertVeh.imagenes);
        insertVeh.imagenes = mergedImagenes;
      }

      batch.set(docRef, insertVeh, { merge: true });
    }
    await batch.commit();

    res.status(200).json({ estado: true, message: "Sincronización exitosa" });
  } catch (error) {
    res.status(500).json({ estado: false, error: "Error en la sincronización" });
  }
});

function mergeImagenes(existingImagenes, newImagenes) {
  const mergedImagenes = [...existingImagenes];

  for (const newImagen of newImagenes) {
    if (!mergedImagenes.includes(newImagen)) {
      mergedImagenes.push(newImagen);
    }
  }

  return mergedImagenes;
}



//Desactivar Vehiculo
router.post("/desactivar-vehiculo/:id", desactivarDisponible, (req, res) => {
  if (res.estado) {
    return res.status(200).send({
      estado: res.estado,
      mensaje: `${res.message}`, //y eso pa
    });
  } else {
    return res.status(400).send({
      estado: res.estado,
      mensaje: `${res.message}`,
    });
  }
});

router.post("/actualizarPlaca", actualizarPlaca, (req, res) => {
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

// Ruta para subir la imagen a Amazon S3 



router.post('/subir-imagen', async (req, res) => {
  if (!req.body.imagenes || req.body.imagenes.length === 0) {
    return res.status(400).json({
      estado: false,
      mensaje: 'No se ha proporcionado ninguna imagen',
    });
  }

  let imagenes = [];

  try {
    const resultadoConsulta = await consultarImagenes(req.body.id);
    if (!resultadoConsulta) {
      return res.status(404).json({
        estado: false,
        mensaje: `El vehículo ${req.body.id} no ha sido encontrado`,
      });
    }

    const containerName = 'procenter2';

    blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ estado: false, mensaje: 'Error al crear el contenedor' });
      }

      for (const base64Image of req.body.imagenes) {
        const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, '');
        const binaryData = Buffer.from(base64Data, 'base64');

        const fileName = `${uuid.v1()}.png`;

        // Redimensionar la imagen utilizando sharp
        const resizedImageBuffer = await sharp(binaryData)
          .resize(1250) // Define el ancho máximo de la imagen redimensionada
          .toBuffer();

        blobService.createBlockBlobFromText(containerName, fileName, resizedImageBuffer, {
          contentSettings: {
            contentType: 'image/png',
          },
        }, (error) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ estado: false, mensaje: 'Error al subir la imagen' });
          }

          const imageUrl = blobService.getUrl(containerName, fileName);
          imagenes.push(imageUrl);
          
          if (imagenes.length === req.body.imagenes.length) {
            agregarImagen(imagenes, req.body.id)
              .then(resultadoAgregacion => {
                return res.status(200).json(resultadoAgregacion);
              })
              .catch(error => {
                console.error(error);
                return res.status(500).json({ estado: false, mensaje: 'Error al agregar las imágenes' });
              });
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ estado: false, mensaje: 'Error al subir las imágenes a Azure Blob Storage' });
  }
});


module.exports = router;
