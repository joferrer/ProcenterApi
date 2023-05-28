const { db } = require("../firebase/providerFirestore");
const SchemaVehiculo = require('../schemas/SchemaVehiculo');


async function crearVehiculo(req, res, next) {
    try {
      console.log(req.body)
      const { error } = SchemaVehiculo.validate(req.body);
  
      if (error) {
        res.status(400).send({"estado": false, "error":error.details[0].message});
        next();
      }
      else { 
        const vehiculo = {
          id: db.collection("vehiculos").doc().id,
          marca : req.body.marca,
          modelo : req.body.modelo,
          anio : req.body.anio,
          motor :  req.body.motor,
          color :  req.body.color, 
          rin :  req.body.rin,
          imagenes : req.body.imagenes,
          placa : req.body.placa,
          otros : req.body.otros,
          disponible: true,
          precio: req.body.precio
        }
        console.log(vehiculo);
        const usuariodoc = await db.collection("vehiculos").doc(vehiculo.id).set(vehiculo);
        res.status(200).send({"estado": true, "mensaje": "Vehiculo agregado correctamente"})
        next();
      }
    }
  
    catch (error) {
      res.status(400).send({"estado": false, "mensaje": error});
      next();
    }
  };
  
  async function obtenerVehiculos(req, res, next) {
    try {
      const userRef = db.collection("vehiculos");
      const response = await userRef.get();
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      res.status(200).send({"estado": true, "mensaje": "¡Lista de vehiculos cargado con exito!", "data": responseArr})
      next();
    }
    catch (error) {
      res.status(400).send({"estado": false, "mensaje": error});
      next();
    }
  };
  
  async function obtenerVehiculoById(req, res, next) {
    try {
      const id = req.params.id;
      const userRef = db.collection("vehiculos").doc(id);
      const response = await userRef.get().then((doc) => {
        if (doc.exists) {
          let responseArr = [];
          responseArr.push(doc.data());
          res.status(200).send({"estado": true, "mensaje": "¡Vehiculo consultado con exito!", "data": responseArr})
          next();
        } else {
          res.status(400).send({"estado": false, "mensaje": "El vehiculo no existe"});
          next();
        }
      })
    }
    catch (error) {
      res.status(400).send({"estado": false, "mensaje": error});
      next();
    }
  };
  
  async function actualizarVehiculo(req, res, next) {
    try {
      const id = req.params.id
      console.log(id)
      const { error } = SchemaVehiculo.validate(req.body);
      if (error) {
         res.status(400).send({"estado": false, "error": error.details[0].message});
         next();
      }
      else {
        const vehiculo = {
          Newmarca : req.body.marca,
          Newmodelo : req.body.modelo,
          Newanio : req.body.anio,
          Newmotor :  req.body.motor,
          Newcolor :  req.body.color, 
          Newrin :  req.body.rin,
          Newimagenes : req.body.imagenes,
          Newplaca : req.body.placa,
          Newotros : req.body.otros,
          Newprecio: req.body.precio
        }
        const vehiculodoc = await db.collection("vehiculos").doc(id).update({
          marca : vehiculo.Newmarca,
          modelo : vehiculo.Newmodelo,
          anio : vehiculo.Newanio,
          motor :  vehiculo.Newmotor,
          color :  vehiculo.Newcolor, 
          rin :  vehiculo.Newrin,
          imagenes : vehiculo.Newimagenes,
          placa : vehiculo.Newplaca,
          otros : vehiculo.Newotros,
          precio: vehiculo.Newprecio
        })
        res.status(200).send({"estado": true, "mensaje":"Usuario actualizado con exito" });
         next();
      }}
       catch (error) {
        res.status(400).send({"estado": false, "mensaje":"Documento no existe en la base de datos"} );
        console.error(error);
        next();
      
    }
  };
  
  async function eliminarVehiculo(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id)
  
      const userRef = db.collection("vehiculos").doc(id);
      const response = await userRef.get().then((doc) => {
        if (doc.exists) {
          if(doc.data().estado==false){
            res.status(400).send({"estado": false, "mensaje": "No puedes eliminar un vehiculo que esta en proceso de venta"})
          
          }
          else{
            userRef.delete();
            res.status(200).send({"estado": true, "mensaje":"Eliminado con exito" });
          
          }
       
          
        } else {
          console.log("no entro")
          res.status(400).send({"estado": false, "mensaje": "El documento no existe"});
          next();
        }
      })
    }
    catch (error) {
      res.status(400).send({"estado": false, "error": error});
      next();
    }
  };


module.exports = { crearVehiculo, obtenerVehiculos, obtenerVehiculoById, actualizarVehiculo, eliminarVehiculo}