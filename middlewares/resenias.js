const { db } = require("../firebase/providerFirestore");

async function obtenerResenias(req, res, next) {
    try {
      const userRef = db.collection("reviews");
      const response = await userRef.get();

      if(response.empty){
        return res.status(400).send({"estado": false, "mensaje": "No hay reseñas en la base de datos"});
      }
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      res.status(200).send({ "estado": true, "mensaje": "¡Lista de reseñas cargado con exito!", "data": responseArr })
   
    }
    catch (error) {
      return res.status(400).send({"estado": false, "mensaje": error});
    }
  };


  module.exports = { obtenerResenias }