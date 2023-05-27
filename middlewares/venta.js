const express = require('express');
const router = express.Router();
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");
const moment = require('moment');
const {schemaVenta, schemaVentaActualizacion} = require("../schemas/SchemaVenta");
const SchemaUsuarioCliente = require("../schemas/SchemaUsuario");


const { Timestamp } = require('firebase/firestore');

function formatoFecha(fecha) {
  const fechaIniTime = fecha.split("-");
  const ini = Timestamp.fromDate(
    new Date(
      Number(fechaIniTime[2]),
      Number(fechaIniTime[0]) - 1,
      Number(fechaIniTime[1]),
      6
    )
  );
  
}




async function cventa(req, res, next) {
  try {

    const { error } = schemaVenta.validate(req.body);
    if (error) {
      return res.status(400).send({ "estado": false, "error": error.details[0].message });
    }

    const idvehiculo = req.body.pago.idvehiculo;
    const vehiculoRef = db.collection("vehiculos").doc(idvehiculo);
    const vehiculoSnapshot = await vehiculoRef.get();
    const vehiculoObject = vehiculoSnapshot.data();

    const idclientecc = req.body.cliente.cedula;
    const clienteRef = db.collection("usuarios");
    const clienteSnapshot = await clienteRef.where('cedula', '==', idclientecc).get();
    
    const idasesor = req.body.asesor.idasesor;
    const asesorRef = db.collection("usuarios").doc(idasesor);
    const asesorSnapshot = await asesorRef.get();
    const asesorObject = asesorSnapshot.data();

 

    if (!vehiculoSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del vehiculo no existe" }));
    }else{
      if (vehiculoObject.estado=="VENDIDO" || vehiculoObject.estado=="PENDIENTE") {
        return res.status(400).send(({ estado: false, mensaje: "El vehiculo esta en proceso de venta o fue vendido" }));
    }}

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
        edad: req.body.cliente.edad,
        correo: req.body.cliente.correo,
        imagen: req.body.cliente.imagen,
        telefono: req.body.cliente.telefono,
        rol: "CLIENTE",
        fechaVincu: moment().format('DD/MM/YYYY')
      }
      const usuariodoc = await db.collection("usuarios").doc(usuario.id).set(usuario);

      //Consulta el usuario recien agregado y se trae toda su informacion
      const usuarioRef = db.collection("usuarios").doc(usuario.id);
      const usuarioSnapshot = await usuarioRef.get();
      const usuarioObject = usuarioSnapshot.data();
      const idc = usuarioObject.id
      const nombrec = usuarioObject.nombre
      const cedulac = usuarioObject.cedula
      const edadc = usuarioObject.edad
      const correoc = usuarioObject.correo
      const imagenc = usuarioObject.imagen
      const telefonoc = usuarioObject.telefono
     

      const venta = {
        id: db.collection("ventas").doc().id,
        fechaCreacion: req.body.fechaCreacion,
        pago: {
          precioventa: req.body.pago.precio,
          idvehiculo: vehiculoSnapshot.data()
        },
        estado: {
          contexto: "PROCESO",
          descripcion: "Pendiente de aprobacion/cancelacion de la venta"
        },
        cliente: {
          id: idc,
          nombre: nombrec,
          cedula: cedulac,
          edad: edadc,
          correo: correoc,
          imagen: imagenc,
          telefono: telefonoc
        },
        asesor:{
          idasesor: asesorSnapshot.data()
        }
      }
      const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
      await vehiculoRef.update({estado: "PROCESO"});
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
    

    if (!asesorSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del cliente no existe" }));
    }
    else {
      if (asesorObject.rol != "ASESOR") {
        return res.status(400).send(({ estado: false, mensaje: "El ID del cliente no corresponde a un usuario con rol de asesor, verifica datos o inserta un nuevo cliente" }));
      }
    }

    const idc = primerDocumento.id
    const nombrec = primerDocumento.nombre
    const cedulac = primerDocumento.cedula
    const edadc = primerDocumento.edad
    const correoc = primerDocumento.correo
    const imagenc = primerDocumento.imagen
    const telefonoc = primerDocumento.telefono
    
    const venta = {
      id: db.collection("ventas").doc().id,
      fechaCreacion: req.body.fechaCreacion,
      pago: {
        precioventa: req.body.pago.precio,
        idvehiculo: vehiculoSnapshot.data()
      },
      estado: {
        contexto: "PROCESO",
        descripcion: "Pendiente de aprobacion/rechazo de la venta"
      },
      cliente: {
        id: idc,
        nombre: nombrec,
        cedula: cedulac,
        edad: edadc,
        correo: correoc,
        imagen: imagenc,
        telefono: telefonoc

      },
      asesor:{
        idasesor: asesorSnapshot.data()
      }
    }
    const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
    await vehiculoRef.update({estado: "PROCESO"});
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

async function rventabyid(req, res, next) {
  try {

    const idventa = req.params.id;
    console.log(idventa)

    const ventaidRef = db.collection("ventas").doc(idventa);
    const response = await ventaidRef.get().then((doc) => {
      if (doc.exists) {
        console.log("entro")
        let responseArr = [];
        responseArr.push(doc.data());
        res.status(200).send(({ estado: true, mensaje: "Consulta de Venta de manera exitosa", data: responseArr }));
        next();
      } else {
        console.log("no entro")
        res.status(400).send(({ estado: false, mensaje: "El documento con ID " + idventa + ", no existe" }));
        next();
      }
    })
  }
  catch (error) {
    res.status(400).send(({ estado: false, mensaje: error }));
    next();
  }
};

async function uventa(req, res, next) {
  try {
    const id = req.params.id
    const { error } = schemaVentaActualizacion.validate(req.body);
    if (error) {
      return res.status(400).send({ "estado": false, "error": error.details[0].message });
    }

    const idvehiculo = req.body.pago.idvehiculo;
    const vehiculoRef = db.collection("vehiculos").doc(idvehiculo);
    const vehiculoSnapshot = await vehiculoRef.get();
    const vehiculoObject = vehiculoSnapshot.data();

    const idclientecc = req.body.cliente.cedula;
    const clienteRef = db.collection("usuarios");
    const clienteSnapshot = await clienteRef.where('cedula', '==', idclientecc).get();

    const idasesor = req.body.asesor.idasesor;
    const asesorRef = db.collection("usuarios").doc(idasesor);
    const asesorSnapshot = await asesorRef.get();
    const asesorObject = asesorSnapshot.data();

 

    if (!vehiculoSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del vehiculo no existe" }));
    }else{
      if (vehiculoObject.estado=="VENDIDO" || vehiculoObject.estado=="PENDIENTE") {
        return res.status(400).send(({ estado: false, mensaje: "El vehiculo esta en proceso de venta o fue vendido" }));
    }}

    if (clienteSnapshot.empty) {
      const { error } = SchemaUsuarioCliente.SchemaUsuarioCliente.validate(req.body.cliente);
      if (error) {
        return res.status(400).send({ "estado": false, "error": error.details[0].message });
      }


      
      const usuario = {
        id: db.collection("usuarios").doc().id,
        nombre: req.body.cliente.nombre,
        cedula: req.body.cliente.cedula,
        edad: req.body.cliente.edad,
        correo: req.body.cliente.correo,
        imagen: req.body.cliente.imagen,
        telefono: req.body.cliente.telefono,
        rol: "CLIENTE"
      }
      const usuariodoc = await db.collection("usuarios").doc(usuario.id).set(usuario);

      //Consulta el usuario recien agregado y se trae toda su informacion
      const usuarioRef = db.collection("usuarios").doc(usuario.id);
      const usuarioSnapshot = await usuarioRef.get();
      const usuarioObject = usuarioSnapshot.data();
      const idc = usuarioObject.id
      const nombrec = usuarioObject.nombre
      const cedulac = usuarioObject.cedula
      const edadc = usuarioObject.edad
      const correoc = usuarioObject.correo
      const imagenc = usuarioObject.imagen
      const telefonoc = usuarioObject.telefono
     
      estadoActual = "PROCESO"
      if(req.body.estado.contexto=="VENDIDO"){
        estadoActual = "VENDIDO"
      }
      else{
        if(req.body.estado.contexto=="CANCELADO"){
          estadoActual = "DISPONIBLE"
        }
      }
      const venta = {
        newfechaCreacion: req.body.fechaCreacion,
        newpago: {
          newprecioventa: req.body.pago.precio,
          newidvehiculo: vehiculoSnapshot.data()
        },
        newestado: {
          newcontexto: req.body.estado.contexto,
          newdescripcion: req.body.estado.descripcion
        },
        newcliente: {
          newid: idc,
          newnombre: nombrec,
          newcedula: cedulac,
          newedad: edadc,
          newcorreo: correoc,
          newimagen: imagenc,
          newtelefono: telefonoc
        },
        newasesor:{
          newidasesor: asesorSnapshot.data()
        }
      }
      
      const ventadoc = await db.collection("ventas").doc(id).update({
        fechaCreacion: venta.newfechaCreacion,
        pago: {
          precioventa: venta.newpago.newprecioventa,
          idvehiculo: venta.newpago.newidvehiculo
        },
        estado: {
          contexto: venta.newestado.newcontexto,
          descripcion: venta.newestado.newdescripcion
        },
        cliente: {
          id: venta.newcliente.newid,
          nombre: venta.newcliente.newnombre,
          cedula: venta.newcliente.newcedula,
          edad: venta.newcliente.newedad,
          correo: venta.newcliente.newcorreo,
          imagen: venta.newcliente.newimagen,
          telefono:  venta.newcliente.newtelefono
  
        },
        asesor:{
          idasesor: venta.newasesor.newidasesor
        }
      })
  
      if(req.body.estado.contexto=="VENDIDO"){
        const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
        await vehiculoRef.update({estado: "VENDIDO"});
      }
      else{
        if(req.body.estado.contexto=="CANCELADO"){
          const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
          await vehiculoRef.update({estado: "DISPONIBLE"});
        }
      }
      return res.status(200).send(({ estado: true, mensaje: "Venta Actualizada con exito" }));
     
    }
   
    else {
      const primerDocumento = clienteSnapshot.docs[0].data();
      console.log(primerDocumento.rol)
      console.log("CLIENTE")
      if (primerDocumento.rol != "CLIENTE") {

        return res.status(400).send(({ estado: false, mensaje: "El ID del cliente no corresponde a un usuario con rol de cliente, verifica datos o inserta un nuevo cliente" }));
      }
    

    if (!asesorSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del cliente no existe" }));
    }
    else {
      if (asesorObject.rol != "ASESOR") {
        return res.status(400).send(({ estado: false, mensaje: "El ID del cliente no corresponde a un usuario con rol de asesor, verifica datos o inserta un nuevo cliente" }));
      }
    }

    const idc = primerDocumento.id
    const nombrec = primerDocumento.nombre
    const cedulac = primerDocumento.cedula
    const edadc = primerDocumento.edad
    const correoc = primerDocumento.correo
    const imagenc = primerDocumento.imagen
    const telefonoc = primerDocumento.telefono
    
    
    const venta = {
      newfechaCreacion: req.body.fechaCreacion,
      newpago: {
        newprecioventa: req.body.pago.precio,
        newidvehiculo: vehiculoSnapshot.data()
      },
      newestado: {
        newcontexto: req.body.estado.contexto,
        newdescripcion: req.body.estado.descripcion
      },
      newcliente: {
        newid: idc,
        newnombre: nombrec,
        newcedula: cedulac,
        newedad: edadc,
        newcorreo: correoc,
        newimagen: imagenc,
        newtelefono: telefonoc
      },
      newasesor:{
        newidasesor: asesorSnapshot.data()
      }
    }

  
    const ventadoc = await db.collection("ventas").doc(id).update({
      fechaCreacion: venta.newfechaCreacion,
      pago: {
        precioventa: venta.newpago.newprecioventa,
        idvehiculo: venta.newpago.newidvehiculo
      },
      estado: {
        contexto: venta.newestado.newcontexto,
        descripcion: venta.newestado.newdescripcion
      },
      cliente: {
        id: venta.newcliente.newid,
        nombre: venta.newcliente.newnombre,
        cedula: venta.newcliente.newcedula,
        edad: venta.newcliente.newedad,
        correo: venta.newcliente.newcorreo,
        imagen: venta.newcliente.newimagen,
        telefono:  venta.newcliente.newtelefono

      },
      asesor:{
        idasesor: venta.newasesor.newidasesor
      }
    })

    if(req.body.estado.contexto=="VENDIDO"){
      const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
      await vehiculoRef.update({estado: "VENDIDO"});
    }
    else{
      if(req.body.estado.contexto=="CANCELADO"){
        const vehiculoRef = db.collection("vehiculos").doc(vehiculoSnapshot.id); 
        await vehiculoRef.update({estado: "DISPONIBLE"});
      }
    }

    return res.status(200).send(({ estado: true, mensaje: "Venta Actualizada con exito" }));
   
  }}
   catch (error) {
    console.error(error);
    res.status(400).send(({ estado: false, mensaje: error }));
    next();
  }
};



async function dventa(req, res, next) {
  try {
    const idventa = req.params.id;
    console.log(idventa)

    const ventaRef = db.collection("ventas").doc(idventa);
    const response = await ventaRef.get().then((doc) => {
      if (doc.exists) {
        ventaRef.delete();
        res.status(200).send(({ estado: true, mensaje: "Eliminado con exito" }))
        next();
      } else {
        res.status(400).send(({ estado: false, mensaje: "El documento con ID " + idventa + ", no existe" }));
        next();
      }
    })
  }
  catch (error) {
    return res.status(400).send(({ estado: false, mensaje: error }))
  }
};

module.exports = { cventa, rventa, rventabyid, uventa, dventa }