const express = require('express');
const router = express.Router();
const { db } = require('../../firebase/providerFirestore');


//Obtiene una lista de todos los Vehiculos del Catalogo
router.get('/catalogo', async(req, res) => {
    try {
        const userRef = db.collection("vehiculos");
        const response = await userRef.get();
        let responseArr = [];

        response.forEach ( doc => {
            responseArr.push(doc.data());
        }); 
        res.send(responseArr);
    }
    catch (error) {
        res.send(error);
    }
});


//Muestra un vehiculo especifico usando la ID/PLACA en especifico
router.get('/catalogo/:id', async (req, res)=>{
    try {
        const usersRef = db.collection("vehiculos").doc(req.params.id);
        const response = await usersRef.get();
        res.send(response.data());
    }catch(error){
        res.send(error);
        }
});


//Agrega un nuevo vehiculo al catalogo
router.post('/agregarVehiculo', async(req, res) => {
    try{    
        const id = req.body.placaid
        const vehJson ={
            placa: req.body.placaid,
            marca: req.body.marca,
            modelo: req.body.modelo,
            anio: req.body.anio,
            motor: req.body.motor,
            color: req.body.color,
            rin: req.body.rin,
            img: req.body.img,
            lugarm: req.body.lugarm,
            otro: req.body.otro
        };
        console.log(vehJson);
        const vehRef = await db.collection("vehiculos").doc(id).set(vehJson);
        res.send("Vehiculo agregado correctamente")
        res.status(200);
    }

    catch(error){
        console.error(error);
        res.status(404);
    }
});

//Actualizando un vehiculo usando la ID
router.post('/actualizarVehiculo/:id', async (req, res) => {
    try {
        
        const nplaca= req.params.id
        const nmarca= req.body.marca
        const nmodelo= req.body.modelo
        const nanio= req.body.anio
        const nmotor= req.body.motor
        const ncolor= req.body.color
        const nrin= req.body.rin
        const nimg= req.body.img
        const lugarm= req.body.lugarm
        const notro= req.body.otro
        const nvehRef = await db.collection("vehiculos").doc(req.params.id).update({
            placa: nplaca,
            marca: nmarca,
            modelo: nmodelo,
            anio: nanio,
            motor: nmotor,
            color: ncolor,
            rin: nrin,
            img: nimg,
            lugarm: lugarm,
            otro: notro
        });
        res.send("Vehiculo actualizado correctamente")
        res.status(200);
    } catch (error) {
        console.error(error);
    }
});

//Delete a vehicle with a params named id in the url, where the params deleted the document 
router.delete('/deleteVehicles/:id', async (req, res) => {
    try{
    const vehRef = await db.collection("vehiculos").doc(req.params.id).delete();
    res.send("Vehiculo eliminado con exito");
    res.status(200);
    }
    catch (error) {
        console.error(error);
    }
});
module.exports = router;