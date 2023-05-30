const { db } = require("../firebase/providerFirestore");
const { SchemaUsuario, SchemaUsuarioCliente } = require("../schemas/SchemaUsuario");
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


async function crearUsuario(req, res, next) {
  try {

    const { error } = SchemaUsuario.validate(req.body);
    const idclientecedula = req.body.cedula;
    const clienteRef = db.collection("usuarios");
    const clienteSnapshotCedula = await clienteRef.where('cedula', '==', idclientecedula).get();
    
    
    const idclientecorreo = req.body.correo;
    const clienteRefcorreo = db.collection("usuarios");
    const clienteSnapshotCorreo= await clienteRefcorreo.where('correo', '==', idclientecorreo).get();
    
    const idclienteTelefono = req.body.telefono;
    const clienteRefTelefono= db.collection("usuarios");
    const clienteSnapshotTelefono= await clienteRefTelefono.where('telefono', '==', idclienteTelefono).get();
    
    if (!clienteSnapshotCedula.empty) {
      return res.status(400).send(({ estado: false, mensaje: "La cedula del cliente ya existe en algun registro de la base de datos" }));
    }
    if (!clienteSnapshotCorreo.empty) {
      return res.status(400).send(({ estado: false, mensaje: "El correo del cliente ya existe en algun registro la base de datos" }));
     
    }
    if (!clienteSnapshotTelefono.empty) {
      return res.status(400).send(({ estado: false, mensaje: "El telefono del cliente ya existe en algun registro la base de datos" }));
     
    }

    if (error) {
       return res.status(400).send({ "estado": false, "error": error.details[0].message});
      
    }

    
    else {
      const usuario = {
        id: db.collection("usuarios").doc().id,
        nombre: req.body.nombre,  
        cedula: req.body.cedula,
        correo: req.body.correo, 
        imagen: req.body.imagen,
        telefono: req.body.telefono,
        rol: req.body.rol,
        fechaVincu: formatoFecha(moment().format('DD/MM/YYYY')),
        estado: true
      } 
      const usuariodoc = await db.collection("usuarios").doc(usuario.id).set(usuario);
      res.status(200).send({ "estado": true, "mensaje": "¡Usuario creado con exito!" })
      
    }
  }
  catch(error) {
    console.log(error);
     return res.status(400).send({"estado": false, "mensaje": error});

  }
};

async function obtenerUsuarios(req, res, next) {
  try {
    const userRef = db.collection("usuarios");
    const response = await userRef.get();
    if(response.empty){
      return res.status(400).send({"estado": false, "mensaje": "No hay usuarios registrados en la base de datos"});
    }
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.status(200).send({ "estado": true, "mensaje": "¡Lista de usuario cargado con exito!", "data": responseArr })
    next();
  }
  catch (error) {
    console.log
    return res.status(400).send({"estado": false, "mensaje": error});
  }
};

async function obtenerUsuarioById(req, res, next) {
  try {
    const idUsuario = req.params.id;
    const userRef = db.collection("usuarios").doc(idUsuario);
    const response = await userRef.get().then((doc) => {
      if (doc.exists) {
        let responseArr = [];
        responseArr.push(doc.data());
        res.status(200).send({ "estado": true, "mensaje": "¡Usuario consultado con exito!", "data": responseArr })
        next();
      } else {
        return res.status(400).send({ "estado": false, "mensaje": "El usuario no existe" })
    }})
  }
  catch (error) {
    return res.status(400).send({"estado": false, "mensaje": error});
    
  }
};

async function actualizarUsuario(req, res, next) {
  try {
    const id = req.params.id;
    const { error } = SchemaUsuario.validate(req.body);
    if (error) {
      return res.status(400).send({ "estado": false, "mensaje": error.details[0].message });
     
    }
    const userRef = db.collection("usuarios").doc(id);
    const response = await userRef.get().then((doc) => {

      if (!doc.exists) {
        return res.status(400).send({"estado": false, "mensaje": "El usuario no existe"});
      }})
      
      let useriddocument = "";
      let userccdocument = "";
      let usertldocument = "";
      let useremdocument = "";
      const userRefID = db.collection("usuarios").doc(id);
      const iduser = await userRefID.get().then((doc) => {

        const datauserid = doc.data().rol;
        const datausercc = doc.data().cedula;
        const datausertl = doc.data().telefono;
        const datauserem = doc.data().correo;

        useriddocument= datauserid;
        userccdocument= datausercc;
        usertldocument= datausertl;
        useremdocument=datauserem
        })
  
        console.log(useriddocument); 

    const idclientecedula = req.body.cedula;
    const clienteRef = db.collection("usuarios");
    const clienteSnapshotCedula = await clienteRef.where('cedula', '==', idclientecedula).get();
    
    

    const idclientecorreo = req.body.correo;
    const clienteRefcorreo = db.collection("usuarios");
    const clienteSnapshotCorreo= await clienteRefcorreo.where('correo', '==', idclientecorreo).get();
    
    const idclienteTelefono = req.body.telefono;
    const clienteRefTelefono= db.collection("usuarios");
    const clienteSnapshotTelefono= await clienteRefTelefono.where('telefono', '==', idclienteTelefono).get();
    

    
    if (!clienteSnapshotCedula.empty && req.body.cedula != userccdocument) {
      return res.status(400).send(({ estado: false, mensaje: "La cedula del cliente ya existe en algun registro de la base de datos" }));
    }
    if (!clienteSnapshotCorreo.empty && req.body.correo != useremdocument) {
      return res.status(400).send(({ estado: false, mensaje: "El correo del cliente ya existe en algun registro la base de datos" }));
     
    }
    if (!clienteSnapshotTelefono.empty && req.body.telefono != usertldocument) {
      return res.status(400).send(({ estado: false, mensaje: "El telefono del cliente ya existe en algun registro la base de datos" }));
     
    }
    else {
      console.log(id)
      const usuarioconsulta = await db.collection("usuarios").doc(id).get();
      const usuarioconsultaData = usuarioconsulta.data();
      if(usuarioconsultaData.rol == "ASESOR" && req.body.rol == "CLIENTE"){
        console.log("entro");
        const clienteRefTVenta= db.collection("ventas");
        const clienteSnapshotVentaProceso = await clienteRefTVenta.where('estado.contexto', '==','PROCESO').where('asesor.idasesor.id', '==',id).get();
        if(!clienteSnapshotVentaProceso.empty){
          return res.status(400).send(({ estado: false, mensaje: "El usuario no puede ser cliente porque tiene ventas en proceso como asesor" }));
        }
      }

      if(usuarioconsultaData.rol == "CLIENTE" && req.body.rol == "ASESOR"){
        
        const clienteRefTVenta= db.collection("ventas");
        const clienteSnapshotClienteProceso = await clienteRefTVenta.where('estado.contexto', '==',"PROCESO").where('cliente.id', '==',id).get();
        console.log(!clienteSnapshotClienteProceso.empty);
        if(!clienteSnapshotClienteProceso.empty){
          return res.status(400).send(({ estado: false, mensaje: "El usuario no puede ser asesor porque tiene ventas en proceso como cliente" }));
        }
      }

      const usuario = {
        newnombre: req.body.nombre,
        newcedula: req.body.cedula,
        newcorreo: req.body.correo,
        newimagen: req.body.imagen,
        newtelefono: req.body.telefono,
        newrol: req.body.rol

      }
      const usuariodoc = await db.collection("usuarios").doc(id).update({
        nombre: usuario.newnombre,
        cedula: usuario.newcedula,
        correo: usuario.newcorreo,
        imagen: usuario.newimagen,
        telefono: usuario.newtelefono,
        rol: usuario.newrol
      })
      res.status(200).send({"estado": true, "mensaje": "¡Usuario actualizado con exito!"});

    }
  }
  catch (error) {
    console.log(error)
    return res.status(400).send({"estado": false, "mensaje": error});
  }
};

async function desactivarUsuario(req, res, next) {
  try {
 
    const idUsuario = req.params.id;
    const userRef = await db.collection("usuarios").doc(idUsuario);
    const userRefRol =await  db.collection("usuarios").doc(idUsuario).get();
    const response = await userRef.get().then((doc) => {

    if (doc.exists) {
        if(userRefRol.data().rol=="CLIENTE"){
          return res.status(400).send(({ estado: false, mensaje: "No se puede desactivar clientes con rol de cliente, solo Publicista, asesores y administradores" }));
        }
        userRef.update({
        "estado": false,
        "fechaDesvincu": formatoFecha(moment().format('DD/MM/YYYY'))
        })
        res.status(200).send({"estado": true, "mensaje": "¡Usuario desactivado con exito!"});
        next();
      } else {
        return res.status(400).send({"estado": false, "mensaje": "El usuario no existe"});
      }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).send({"estado": false, "mensaje": error});
  }
};

async function activarUsuario(req, res, next) {
  try {
 
    const idUsuario = req.params.id;
    const userRef = await db.collection("usuarios").doc(idUsuario);
    const userRefRol =await  db.collection("usuarios").doc(idUsuario).get();
    const response = await userRef.get().then((doc) => {

    if (doc.exists) {
        if(userRefRol.data().rol=="CLIENTE"){
          return res.status(400).send(({ estado: false, mensaje: "No se puede activar clientes con rol de cliente, solo Publicista, asesores y administradores" }));
        }
        userRef.update({
        "estado": true,
        "fechaDesvincu": null
        })
        res.status(200).send({"estado": true, "mensaje": "¡Usuario activado con exito!"});
        next();
      } else {
        return res.status(400).send({"estado": false, "mensaje": "El usuario no existe"});
      }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).send({"estado": false, "mensaje": error});
  }
};


module.exports = {
  crearUsuario,
  actualizarUsuario,
  desactivarUsuario,
  obtenerUsuarioById,
  activarUsuario,
  obtenerUsuarios
}