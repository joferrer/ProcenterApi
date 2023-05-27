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

async function desactivarDisponible(req, res, next) {
    let idVehiculo = req.params.id;
    try {
        const id = idVehiculo.replace(':','');
        const collectionRef = db.collection('vehiculos').doc(id);
        const updateData = { disponible: false};
        await collectionRef.update(updateData);

        res.estado = true
        res.message = `El vehiculo ${idVehiculo} se ha deshabilitado correctamente `;

        res.id = idVehiculo;
        next(); 
    }
    catch(error){
        res.estado = false;
        res.message = `No se ha encontrado el vehiculo ${idVehiculo}`;
        next();
    }
}

module.exports = { consultarCatalogo, desactivarDisponible }