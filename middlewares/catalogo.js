const { db } = require("../firebase/providerFirestore");
const { traerCatalogo } = require('../helpers/catalogo')
const axios = require("axios");

async function consultarCatalogo(req, res, next) {
    try {
      const autos = await db.collection('vehiculos').get();
      req.autos = autos;
      next();
    }
    catch{
        return console.error("se jodio");
    }
}

async function actualizarCatalogo(req, res, next) {
    try{
        const autos = await traerCatalogo();
        req.autos = autos;
        console.log(req.autos)
        next();
    }
    catch{
        return console.error("se jodio");
    }
}

module.exports = { consultarCatalogo , actualizarCatalogo}