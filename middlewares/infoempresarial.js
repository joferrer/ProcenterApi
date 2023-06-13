const express = require("express");
const router = express.Router();
const { db } = require("../firebase/providerFirestore");
const { SchemaInfoEmpresa } = require("../schemas/SchemaInfoEmpresa");

async function obtenerInfoEmpresarial(req, res, next) {
    try {
      const userRef = db.collection("informacion").doc("ZpoCU9lHZ0uxnnWeYDRX");
      const response = await userRef.get();
      if(response.empty){
        return res.status(400).send({"estado": false, "mensaje": "No existen informacion actualmente."});
      }
      const infoempresa = response.data()
      res.status(200).send({ "estado": true, "mensaje": "Informacion empresarial cargado con exito", data: infoempresa })
   
    }
    catch (error) {
      console.log(error)
      return res.status(400).send({"estado": false, "mensaje": error});
    }
}
//

async function actualizarInfoEmpresarial(req, res, next) {
  try {
    const id = "ZpoCU9lHZ0uxnnWeYDRX";
    const { error } = SchemaInfoEmpresa.validate(req.body);
    if (error) {
      return res.status(400).send({ "estado": false, "mensaje": error.details[0].message });
     
    }
    const userRef = db.collection("informacion").doc(id);
    const response = await userRef.get().then((doc) => {

      if (!doc.exists) {
        return res.status(400).send({"estado": false, "mensaje": "Error Info Empresarial no existe"});
      }})
      

      const infoempresa = {
        mision: req.body.mision,
        vision: req.body.vision,
        quienesSomos: req.body.quienesSomos

      }
      const usuariodoc = await db.collection("informacion").doc(id).update({
        mision: infoempresa.mision,
        vision: infoempresa.vision,
        quienesSomos: infoempresa.quienesSomos
      })
      res.status(200).send({"estado": true, "mensaje": "¡Informacion actualizada con exito!"});

    }
  catch (error) {
    console.log(error)
    return res.status(400).send({"estado": false, "mensaje": error});
  }
};



module.exports = { obtenerInfoEmpresarial, actualizarInfoEmpresarial}