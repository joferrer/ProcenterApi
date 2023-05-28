const express = require('express');
const router = express.Router();
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");
const moment = require('moment');
const schemaVenta = require("../schemas/SchemaVenta");
const SchemaUsuarioCliente = require("../schemas/SchemaUsuario");



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





async function cventa(req, res, next) {
  try {

    const { error } = schemaVenta.validate(req.body);
    if (error) {
      return res.status(400).send({ "estado": false, "error": error.details[0].message });
    }

    const idvehiculo = req.body.idvehiculo;
    const vehiculoRef = db.collection("vehiculos").doc(idvehiculo);
    const vehiculoSnapshot = await vehiculoRef.get();
    const vehiculo = vehiculoSnapshot.data();

    const idclientecc = req.body.cliente.cedula;
    const clienteRef = db.collection("usuarios");
    const clienteSnapshot = await clienteRef.where('cedula', '==', idclientecc).where('rol', '==', "CLIENTE").get();
    
    const idasesor = req.body.idasesor;
    const asesorRef = db.collection("usuarios").doc(idasesor);
    const asesorSnapshot = await asesorRef.get();
    const asesor = asesorSnapshot.data();

 

    if (!vehiculoSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del vehiculo no existe" }));
    }else{  
      if (vehiculo.disponible==false) {
        return res.status(400).send(({ estado: false, mensaje: "El vehiculo ya fue vendido anteriormente" }));
    }}

    if (!asesorSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del asesor no existe" }));
    }
    else {
      if (asesor.rol != "ASESOR") {
        return res.status(400).send(({ estado: false, mensaje: "El ID no corresponde a un usuario con rol de asesor" }));
      }
      else {
        if (asesor.estado != true) {
          return res.status(400).send(({ estado: false, mensaje: "El ID no corresponde a un usuario con rol de asesor que se encuentre activo" }));
        }
      }
    }

    if (clienteSnapshot.empty) {
      const clienteSnapshotCedula = await clienteRef.where('cedula', '==', req.body.cliente.cedula).get();
    const clienteSnapshotCorreo= await clienteRef.where('correo', '==', req.body.cliente.correo).get();
    const clienteSnapshotTelefono= await clienteRef.where('telefono', '==', req.body.cliente.telefono).get();

      const { error } = SchemaUsuarioCliente.SchemaUsuarioCliente.validate(req.body.cliente);
      if (error) {
        return res.status(400).send({ "estado": false, "error": error.details[0].message });
      } 

      if (!clienteSnapshotCedula.empty) {
        return res.status(400).send(({ estado: false, mensaje: "La cedula del cliente ya existe en algun registro de la base de datos" }));
      }
      if (!clienteSnapshotCorreo.empty) {
        return res.status(400).send(({ estado:false, mensaje: "El correo del cliente ya existe en algun registro la base de datos" }));
       
      }
      if (!clienteSnapshotTelefono.empty) {
        return res.status(400).send(({ estado: false, mensaje: "El telefono del cliente ya existe en algun registro la base de datos" }));
       
      }

      const usuario = {
        id: db.collection("usuarios").doc().id,
        nombre: req.body.cliente.nombre,
        cedula: req.body.cliente.cedula,
        correo: req.body.cliente.correo,
        telefono: req.body.cliente.telefono,
        rol: "CLIENTE",
        fechaVincu: moment().format('DD/MM/YYYY'),
        estado: true
      }
      const usuariodoc = await db.collection("usuarios").doc(usuario.id).set(usuario);

      //Consulta el usuario recien agregado y se trae toda su informacion
      const usuarioRef = db.collection("usuarios").doc(usuario.id);
      const usuarioSnapshot = await usuarioRef.get();
      const usuarioObject = usuarioSnapshot.data();
      const idc = usuarioObject.id
      const nombrec = usuarioObject.nombre
      const cedulac = usuarioObject.cedula
      const correoc = usuarioObject.correo
      const telefonoc = usuarioObject.telefono
     

      const venta = {
        id: db.collection("ventas").doc().id,
        fechaCreacion: formatoFecha(moment().format('DD/MM/YYYY')),
        cliente: {
          id: idc,
          nombre: nombrec,
          cedula: cedulac,
          correo: correoc,
          telefono: telefonoc
        },
        disponible: true,
        vehiculo,
        asesor
      }
      const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
      await vehiculoRef.update({disponible: false});
      await db.collection("ventas").doc(venta.id).set(venta);
      res.status(200).send(({ estado: true, mensaje: "Venta agregada de manera exitosa" }));
      next();
     
    }
   
    else {
      const primerDocumento = clienteSnapshot.docs[0].data();
      console.log(primerDocumento.rol)
      console.log("CLIENTE")
      if (primerDocumento.rol != "CLIENTE") {

        return res.status(400).send(({ estado: false, mensaje: "El ID del cliente no corresponde a un usuario con rol de cliente, verifica datos o inserta un nuevo cliente" }));
      }
    

   
    
    const idc = primerDocumento.id
    const nombrec = primerDocumento.nombre
    const cedulac = primerDocumento.cedula
    let correoc = ""
    if(primerDocumento.correo==req.body.cliente.correo){
    correoc = primerDocumento.correo
  }else{
    correoc = req.body.cliente.correo
  }
  let telefonoc = ""
  if(primerDocumento.telefono==req.body.cliente.telefono){
    telefonoc = primerDocumento.telefono
  }else{
    telefonoc = req.body.cliente.telefono
  }

  const usuarioRef = db.collection("usuarios").doc(idc);
    const venta = {
      id: db.collection("ventas").doc().id,
      fechaCreacion: formatoFecha(moment().format('DD/MM/YYYY')),
      cliente: {
        id: idc,
        nombre: nombrec,
        cedula: cedulac,
        correo: correoc,
        telefono: telefonoc
      },
      disponible: true,
      vehiculo,
      asesor
    }    
    const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
    await vehiculoRef.update({disponible: false});
    await usuarioRef.update({telefono: telefonoc, correo: correoc})
    await db.collection("ventas").doc(venta.id).set(venta);
    res.status(200).send(({ estado: true, mensaje: "Venta agregada de manera exitosa" }));
    next();
  }}
   catch (error) {
    console.error(error);
    res.status(400).send(({ estado: false, mensaje: error }));
    next();
  }
};



async function rventa(req, res, next) {
  try {
    const userRef = db.collection("ventas");
    const response = await userRef.get();
    if(response.empty){
      return res.status(400).send(({ estado: false, mensaje: "No se encontraron ventas registradas" }));
    }
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.status(200).send(({ estado: true, mensaje: "Lista de ventas consultada con exito", data: responseArr }));
    next();
  }
  catch (error) {
    res.status(400).send(({ estado: true, mensaje: error }));
    next();
  }
};

async function rventabyidAsesor(req, res, next) {
  try {
    const idasesor = req.params.id;
    console.log(idasesor)

    const ventaidRef = db.collection("ventas").where('asesor.id', '==', idasesor);
    const snapshot = await ventaidRef.get();

    if (!snapshot.empty) {
      const responseArr = [];
      snapshot.forEach((doc) => {
        responseArr.push(doc.data());
      });
      res.status(200).send({ estado: true, mensaje: "Consulta de Venta de manera exitosa", data: responseArr });
    } else {
      res.status(400).send({ estado: false, mensaje: "No se encontraron ventas para el ID del asesor: " + idasesor });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ estado: false, mensaje: error });
  }
  next();
}

module.exports = { cventa, rventa, rventabyidAsesor }