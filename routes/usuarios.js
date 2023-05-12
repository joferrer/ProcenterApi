const express = require('express');
const router = express.Router();
const { agregarUsuario, obtenerUsuarios, registrarUsuario, iniciarSesion, cusuario, rusuario, rusuariobyid, uusuario, dusuario  } = require("../middlewares/usuarios");
const { db } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");


router.get('/usuario', obtenerUsuarios, (req, res) => {
    res.json();
});

router.post('/registro', registrarUsuario, (req, res) => {
    res.json();
});

router.post('/iniciosesion', iniciarSesion, (req, res) => {
    
});

router.post('/usuario', agregarUsuario, (req, res) => {
    res.redirect("/");
});

router.post('/cusuario', cusuario, (req, res) => {
    res.json();
});
router.get('/rusuario', rusuario, (req, res) => {
    res.json();
});
router.get('/rusuariobyid/:id', rusuariobyid, (req, res) => {
    res.json();
});
router.put('/uusuario/:idusuario', uusuario, (req, res) => {
    res.json();
});
router.delete('/dusuario/:id', dusuario, (req, res) => {
    res.json();
});


module.exports = router;