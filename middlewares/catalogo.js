const { db } = require("../firebase/providerFirestore");
const { traerCatalogo } = require('../helpers/catalogo')
const axios = require("axios");

async function consultarCatalogo(req, res, next) {
    try {
      const autos = await db.collection('vehiculos').where();
      req.autos = autos;
      next();
    }
    catch{
        return console.error("se jodio");
    }
}

module.exports = { consultarCatalogo }