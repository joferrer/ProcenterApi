const express = require('express');
const router = express.Router();
const { db } = require('../../firebase/providerFirestore');


router.get('/Usuarios',(req,res)=>{
    res.send('No hay :(')
})
module.exports = router;

router.post('/crear_ususario',async (req, res)=>{
    try {

        const id = req.body.email;
        const userJson = {
            rol: req.body.rol,
            ventas: req.body.ventas,
            fecha_vinculacion: req.body.fecha_vinculacion,
            telefono: req.body.telefono,
            email: req.body.email,
            nombre: req.body.nombre,
        }
        const response = await db.collection("usuarios").doc(id).set(userJson);
        res.send(response);
    }
    catch(error){
        res.send(error);
    }


});

router.get('/mostrarUsuarios', async (req, res)=>{

    try {
        const usersRef = db.collection("usuarios");
        const response = await usersRef.get();
        let responseArr = [];
        response.forEach(doc=>{
            responseArr.push(doc.data());
        })
        res.send(responseArr);
        } catch(error){
            res.send(error);
        }
});



router.get('/mostrarUsuarios/:id', async (req, res)=>{
    try {
        const usersRef = db.collection("usuarios").doc(req.params.id);
        const response = await usersRef.get();
        res.send(response.data());
    }catch(error){
        res.send(error);
        }
});
  

router.post('/actualizar_ususario/:id',async (req, res)=>{
    try {       
            const nrol= req.body.rol
            const nventas= req.body.ventas
            const nfecha_vinculacion= req.body.fecha_vinculacion
            const ntelefono= req.body.telefono
            const nemail= req.body.email
            const nnombre= req.body.nombre

            const userRef = await db.collection("usuarios").doc(req.params.id).update({
                rol:nrol,
                ventas:nventas,
                fecha_vinculacion:nfecha_vinculacion,
                telefono:ntelefono,
                email:nemail,
                nombre:nnombre
            });
            res.send("usuario actualizado correctamente")
            res.status(200);
        
    }
    catch(error){
        res.send(error);
    }


});

router.delete('/eliminar_usuario/:id',async (req, res)=>{
    try {       
          const response = await db.collection("usuarios").doc(req.params.id).delete();
          res.send(response);
    }
    catch(error){
        res.send(error);
    }


});