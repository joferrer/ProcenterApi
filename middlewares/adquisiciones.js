const { db } = require("../firebase/providerFirestore");
const SchemaAdquisicion = require('../schemas/SchemaAdquisicion');
const SchemaUsuarioCliente = require("../schemas/SchemaUsuario");
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


async function adquisicionVehiculos(req, res, next) {
 

    try {
      console.log(req.body)
      const { error } = SchemaAdquisicion.validate(req.body);
  
      if (error) {
        res.status(400).send({"estado": false, "error":error.details[0].message});
        next();
      }
      else { 

        const idpublic = req.body.idpublic;
        const publicRef = await  db.collection("usuarios").doc(idpublic);
        const publicSnapshot = await publicRef.get();
        const publicista = publicSnapshot.data();

        const idclientecc = req.body.cedula;
        const clienteRef = await db.collection("usuarios");
        const clienteSnapshot = await clienteRef.where('cedula', '==', idclientecc).where('rol', '==', "CLIENTE").get();
    
        
       
        const adquiscionRef = await  db.collection("vehiculos").where('placa', '==', req.body.placa);
      const snapshot = await adquiscionRef.get();
        
      if (!snapshot.empty) {
        return res.status(400).send(({ estado: false, mensaje: "La placa del vehiculo ya existe en algun registro de la base de datos" }));
      }

    if (!publicSnapshot.exists) {
      return res.status(400).send(({ estado: false, mensaje: "El ID del Publicista no existe" }));
    }
    else {
      if (publicista.rol != "PUBLICISTA") {
        return res.status(400).send(({ estado: false, mensaje: "El ID no corresponde a un usuario con rol de publicista" }));
      }
      else {
        if (publicista.estado != true) {
          return res.status(400).send(({ estado: false, mensaje: "El ID no corresponde a un usuario con rol de publicista que se encuentre activo" }));
        }
      }
    }


    if (clienteSnapshot.empty) {

      const clienteSnapshotCedula = await clienteRef.where('cedula', '==', req.body.cedula).get();
    const clienteSnapshotCorreo= await clienteRef.where('correo', '==', req.body.correo).get();
    const clienteSnapshotTelefono= await clienteRef.where('telefono', '==', req.body.telefono).get();

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
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        correo: req.body.correo,
        telefono: req.body.telefono,
        rol: "CLIENTE",
        fechaVincu: formatoFecha(moment().format('DD/MM/YYYY')),
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

        
        const adquisicion = {
          id: db.collection("adquisiciones").doc().id,
          nombre : req.body.nombre,
          marca : req.body.marca,
          modelo : req.body.modelo,
          color :  req.body.color,
          motor :  req.body.motor,
          placa : req.body.placa,
          anio : req.body.anio,
          precioDueno: req.body.precioDueno,
          fechaMatricula: req.body.fechaMatricula,
          fechaCreacion:  formatoFecha(moment().format('DD/MM/YYYY')),
          soat: true,
          prenda : req.body.prenda, 
          impuestos: true,
          detalles : req.body.detalles,
          estado: true,
          cliente: {
            id: idc,
            nombre: nombrec,
            cedula: cedulac,
            telefono: telefonoc,
            correo: correoc
          },
          publicista
        }


       
        

        console.log(adquisicion);
        const adquiscion = await db.collection("adquisiciones").doc(adquisicion.id).set(adquisicion);
        res.status(200).send({"estado": true, "mensaje": "Adquisicion agregada correctamente"})
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
    if(primerDocumento.correo==req.body.correo){
    correoc = primerDocumento.correo
  }else{
    correoc = req.body.cliente.correo
  }
  let telefonoc = ""
  if(primerDocumento.telefono==req.body.telefono){
    telefonoc = primerDocumento.telefono
  }else{
    telefonoc = req.body.telefono
  }

  const adquisicion = {
    id: db.collection("adquisiciones").doc().id,
    nombre : req.body.nombre,
    marca : req.body.marca,
    modelo : req.body.modelo,
    color :  req.body.color,
    motor :  req.body.motor,
    placa : req.body.placa,
    anio : req.body.anio,
    precioDueno: req.body.precioDueno,
    fechaCreacion: formatoFecha(moment().format('DD/MM/YYYY')),
    soat: true,
    prenda : req.body.prenda, 
    impuestos: true,
    detalles : req.body.detalles,
    estado: true,
    cliente: {
      id: idc,
      nombre: nombrec,
      cedula: cedulac,
      telefono: telefonoc,
      correo: correoc
    },
    publicista
  }
  console.log(adquisicion);
        const usuariodoc = await db.collection("adquisiciones").doc(adquisicion.id).set(adquisicion);
        res.status(200).send({"estado": true, "mensaje": "Adquisicion agregada correctamente"})
        next();
}}}


    
  
    catch (error) {
      console.log(error)
      res.status(400).send({"estado": false, "mensaje": error});
      next();
    }
  };

    
  async function obtenerAdquisicion(req, res, next) {
    try {
      const userRef = db.collection("adquisiciones");
      const response = await userRef.get();
      if(response.empty){
        return res.status(400).send(({ estado: false, mensaje: "No se encontraron adquisiciones"}));
      }
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      res.status(200).send({"estado": true, "mensaje": "¡Lista de adquisiciones cargada con exito!", "data": responseArr})
      next();
    }
    catch (error) {
      res.status(400).send({"estado": false, "mensaje": error});
      next();
    }
  };
  
  async function obtenerAdquisicionById(req, res, next) {
    try {
      const idpublicista = req.params.id;
      console.log(idpublicista)
  
      const adquiscionRef = db.collection("adquisiciones").where('publicista.id', '==', idpublicista);
      const snapshot = await adquiscionRef.get();
  
      if (!snapshot.empty) {
        const responseArr = [];
        snapshot.forEach((doc) => {
          responseArr.push(doc.data());
        });
        res.status(200).send({ estado: true, mensaje: "Consulta de adquisicion de manera exitosa", data: responseArr });
      } else {
        res.status(400).send({ estado: false, mensaje: "No se encontraron adquisiciones para el ID del publicista: " + idpublicista });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ estado: false, mensaje: error });
    }
    next();
  }
  async function desactivarAdquisicion(req, res, next) {
    let idAdquisicion = req.params.id;
    try {
        const id = idAdquisicion.replace(':',''); //revisamos despues
        const collectionRef = db.collection('adquisiciones').doc(id);
        const updateData = { estado: false};
        await collectionRef.update(updateData);

        res.estado = true
        res.message = `La adquiscion ${idAdquisicion} se ha deshabilitado correctamente `;

        res.id = idAdquisicion;
        next(); 
    }
    catch(error){
        res.estado = false;
        res.message = `No se ha encontrado la adquisicion ${idAdquisicion}`;
        next();
    }
}


  module.exports =  {adquisicionVehiculos,obtenerAdquisicion,obtenerAdquisicionById,desactivarAdquisicion} ;