const { db } = require("../firebase/providerFirestore");
const { traerCatalogo } = require('../helpers/catalogo')
const axios = require("axios");

async function consultarCatalogo(req, res, next) {
    try {
      const collectionRef = await db.collection('vehiculos');
      const querySnapshot = await collectionRef.where('disponible', '==', true).get();
      const autos = [];

        querySnapshot.forEach((doc) => {
            autos.push(doc.data());
        });
      
      req.autos = autos;
      next();
    }
    catch(error){
        return console.log(error);
    }
}

module.exports = { consultarCatalogo }