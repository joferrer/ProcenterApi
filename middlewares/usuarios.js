const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin"); 
const firebase = require("firebase/app");
require("firebase/auth");

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

async function obtenerUsuarios(req, res, next){
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


module.exports = { agregarUsuario, obtenerUsuarios , registrarUsuario, iniciarSesion }