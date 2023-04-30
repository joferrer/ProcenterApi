const { db } = require("../firebase/providerFirestore");

async function agregarUsuario(req, res, next) {
  try {
    const nuevo = db.collection("usuarios").doc();
    await nuevo.set(req.body);
    next();
  } catch (error) {
    next(error);
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


module.exports = { agregarUsuario, obtenerUsuarios }