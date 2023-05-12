const express = require('express');
const router = express.Router();
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");
const SchemaUsuario = require("../schemas/SchemaUsuario");


async function registrarUsuario(req, res, next) {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    const userResponse = await admin.auth().createUser({
      email: user.email,
      password: user.password,
      emailVerified: false,
      disabled: false
    });
    next(res.status(200).json("Usuario Registrado Correctamente"));
  } catch (error) {
    next(res.status(422).json("Error Fatal:" + error.errorInfo.message));
  }
}

async function obtenerUsuarios(req, res, next) {
  try {
    const usuariosRef = db.collection("usuarios");
    const usuarios = await usuariosRef.get();
    const listaUsuarios = usuarios.docs.map((doc) => doc.data());
    res.json(listaUsuarios);
  } catch (error) {
    next(error);
  }
}

async function agregarUsuario(req, res, next) {
  try {
    const nuevo = db.collection("usuarios").doc();
    await nuevo.set(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

async function iniciarSesion(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await auth._verifyAuthBlockingToken(email, password);
    const token = await user.user.getIdToken();
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

async function cusuario(req, res, next) {
  try {
    const { error } = SchemaUsuario.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
      next();
    }
    else {
      const usuario = {
        id: db.collection("usuarios").doc().id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        imagen: req.body.imagen,
        telefono: req.body.telefono,
        rol: req.body.rol
      }
      const usuariodoc = await db.collection("usuarios").doc(usuario.id).set(usuario);
      res.status(200).send("Usuario agregado correctamente")
      next();
    }
  }

  catch (error) {
    res.status(400).send("Error al insertar el usuario, revisa la informacion que enviaste en el formulario")
    console.error(error);
    next();
  }
};

async function rusuario(req, res, next) {
  try {
    const userRef = db.collection("usuarios");
    const response = await userRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.json(responseArr);
  }
  catch (error) {
    res.status(400).send("Error al cargar usuario en la plataforma");
    res.json(error);
  }
};

async function rusuariobyid(req, res, next) {
  try {
    const idUsuario = req.params.id;
    console.log(idUsuario)

    const userRef = db.collection("usuarios").doc(idUsuario);
    const response = await userRef.get().then((doc) => {
      if (doc.exists) {
        console.log("entro")
        let responseArr = [];
        responseArr.push(doc.data());
        res.status(200).json(responseArr);
        CONS
        next();
      } else {
        console.log("no entro")
        res.status(400).send('El documento no existe');
      }
    })
  }
  catch (error) {
    res.json(error);
  }
};

async function uusuario(req, res, next) {
  try {
    const id = req.params.idusuario
    console.log(req.params)
    const { error } = SchemaUsuario.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    else {
      const usuario = {
        newnombre: req.body.nombre,
        newcorreo: req.body.correo,
        newimagen: req.body.imagen,
        newtelefono: req.body.telefono,
        newrol: req.body.rol
      }
      const usuariodoc = await db.collection("usuarios").doc(id).update({
        nombre: usuario.newnombre,
        correo: usuario.newcorreo,
        imagen: usuario.newimagen,
        telefono: usuario.newtelefono,
        rol: usuario.newrol
      })
      res.status(200).json("Usuario actualizado con exito");
    }}
     catch (error) {
      res.status(400).send("Documento no existe en la base de datos");
    console.error(error);
  }
};

async function dusuario(req, res, next) {
  try {
    const idUsuario = req.params.id;
    console.log(idUsuario)

    const userRef = db.collection("usuarios").doc(idUsuario);
    const response = await userRef.get().then((doc) => {
      if (doc.exists) {
        userRef.delete();
        res.status(200).send('Eliminado con exito')
        next();
      } else {
        console.log("no entro")
        res.status(400).send('El documento no existe');
      }
    })
  }
  catch (error) {
    res.json(error);
  }
};
module.exports = { agregarUsuario, obtenerUsuarios, registrarUsuario, iniciarSesion, cusuario, rusuario, rusuariobyid, uusuario, dusuario }