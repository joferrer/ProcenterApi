const express = require('express');
const router = express.Router();
const { agregarUsuario, obtenerUsuarios } = require("../middlewares/usuarios");

router.get('/usuario', obtenerUsuarios ,(req,res)=>{
   res.json();
});

router.post('/usuario', agregarUsuario,(req,res)=>{
    res.redirect("/");
});

module.exports = router;