const express = require('express');
const router = express.Router();
const { agregarUsuario, obtenerUsuarios, registrarUsuario, iniciarSesion } = require("../middlewares/usuarios");
const { db } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");
const i18n = require('i18n');

router.get('/usuario', obtenerUsuarios, (req, res) => {
    res.json();
});

router.post('/registro', registrarUsuario, (req, res) => {
    res.json();
});

router.post('/iniciosesion', iniciarSesion, (req, res) => {
    res.json();
});

router.post('/usuario', agregarUsuario, (req, res) => {
    res.redirect("/");
});

module.exports = router;