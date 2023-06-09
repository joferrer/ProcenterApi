const express = require("express");
const router = express.Router();
const { db } = require("../firebase/providerFirestore");

async function obtenerLinks(req, res, next) {
    try {
      const userRef = db.collection("link_asesor");
      const response = await userRef.get();
      
      if(response.empty){
        return res.status(400).send({"estado": false, "mensaje": "No hay links de contacto de Business"});
      }
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      res.status(200).send({ "estado": true, "mensaje": "¡Lista de links de contacto cargado con exito!", "data": responseArr })
    }
    catch (error) {
      return res.status(400).send({"estado": false, "mensaje": error});
    }
  };


  module.exports = {
    obtenerLinks
  }