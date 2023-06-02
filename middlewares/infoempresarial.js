const express = require("express");
const router = express.Router();
const { db } = require("../firebase/providerFirestore");

async function obtenerInfoEmpresarial(req, res, next) {
    try {
      const userRef = db.collection("informacion");
      const response = await userRef.get();
      if(response.empty){
        return res.status(400).send({"estado": false, "mensaje": "No existen informacion actualmente."});
      }
      let responseArr = [];
      response.forEach( doc => {
        responseArr.push(doc.data());
      });
      res.status(200).send({ "estado": true, "mensaje": "Informacion empresarial cargado con exito", data: responseArr })
   
    }
    catch (error) {
      console.log
      return res.status(400).send({"estado": false, "mensaje": error});
    }
}

module.exports = { obtenerInfoEmpresarial }