const express = require('express');
const router = express.Router();

router.get('/Usuarios',(req,res)=>{
    res.send('No hay :(')
});

router.post('/catalog',(req,res)=>{
    res.send('Se ejecuto post')
});
router.get('/catalog',(req,res)=>{
    res.send('Se ejecuto get')
});

module.exports = router;