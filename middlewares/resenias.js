const { db } = require("../firebase/providerFirestore");
const { SchemaResenia } = require("../schemas/SchemaResenia");
const moment = require('moment');

const { Timestamp } = require('firebase-admin').firestore;
function formatoFecha(fecha) {
  const fechaIniTime = fecha.split("/");
  const ini = Timestamp.fromDate(
    new Date(
      Number(fechaIniTime[2]),
      Number(fechaIniTime[1]) - 1,
      Number(fechaIniTime[0]) ,
      6
    )
  );
  return ini;
}




async function  obtenerResenias(req, res, next) {
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
      next();
    }
    catch (error) {
      return res.status(400).send({"estado": false, "mensaje": error});
    }
  };


  async function  AgregarResenias(req, res, next) {
    try {
      const { error } = SchemaResenia.validate(req.body);
      if(error){
        return res.status(400).send({"estado": false, "mensaje": error.details[0].message});
      } else {
        const reseña = {
          id: db.collection("reviews").doc().id,
          nombre: req.body.nombre,
          comentarios: req.body.comentarios,
          estado: true,
          fechaCreacion: formatoFecha(moment().format('DD/MM/YYYY'))
        }
        const userRef = db.collection("reviews").doc(reseña.id).set(reseña);
      res.status(200).send({ "estado": true, "mensaje": "¡Reseña agregada con exito!" })
      }}
    
    catch (error) {
      return res.status(400).send({"estado": false, "mensaje": error});
    }
  };


  async function desactivarReseña(req, res, next) {
    try {
   
      const reseña = req.params.id;
      const userRef = await db.collection("reviews").doc(reseña);
      const userRefRol =await  db.collection("reviews").doc(reseña).get();
      const response = await userRef.get().then((doc) => {
  
      if (doc.exists) {
          userRef.update({
          "estado": false,
          "fechaDesactivacion": formatoFecha(moment().format('DD/MM/YYYY'))
          })
          res.status(200).send({"estado": true, "mensaje": "Reseña desactivado con exito!"});
          next();
        } else {
          return res.status(400).send({"estado": false, "mensaje": "La reseña no existe"});
        }
      })
    }
    catch (error) {
      console.log(error)
      return res.status(400).send({"estado": false, "mensaje": error});
    }
  };
  
  async function activarReseña(req, res, next) {
    try {//
   
      const reseña = req.params.id;
      const userRef = await db.collection("reviews").doc(reseña);
      const userRefRol =await  db.collection("reviews").doc(reseña).get();
      const response = await userRef.get().then((doc) => {
  
      if (doc.exists) {
          userRef.update({
          "estado": true,
          "fechaDesactivacion": null
          })
          res.status(200).send({"estado": true, "mensaje": "Reseña activado con exito!"});
          next();
        } else {
          return res.status(400).send({"estado": false, "mensaje": "La Reseña no existe"});
        }
      })
    }
    catch (error) {
      console.log(error)
      return res.status(400).send({"estado": false, "mensaje": error});
    }
  };



  module.exports = { obtenerResenias, AgregarResenias, desactivarReseña, activarReseña }