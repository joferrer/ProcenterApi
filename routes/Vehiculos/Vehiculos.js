const express = require('express');
const router = express.Router();
const { db } = require('../../firebase/providerFirestore');


//Obtain a list of vehicle of the collection "Vehicules"
router.get('/getVehicles', async(req, res) => {
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

//Insert a new vehicle in the database
router.post('/addVehicles', async(req, res) => {
    try{
        //Metodo para obtener el ultimo elemento de id del vehiculo y sumar +1 unidad
        const userRef = db.collection("vehiculos");
        const lastDoc = ((await userRef.orderBy('nombre').limit(1).get()).docs[0])._fieldsProto.idveh.integerValue;
        const newIdVeh = parseInt(lastDoc) + 1;
        //console.log(newIdVeh);

        const id = newIdVeh.toString();

        //Cuerpo de la peticion POST para agregar un nuevo vehiculo
        const vehJson ={
            idveh: newIdVeh,
            marca: req.body.nombre
        };
        const vehRef = await db.collection("vehiculos").doc(id).set(vehJson);
        res.send("Vehiculo agregado correctamente")
        res.status(200);
    }

    catch(error){
        console.error(error);
    }
});

//Update a vehicle in the database using the id atribute
router.post('/updateVehicles', async (req, res) => {
    try {
        const idveh= req.body.idveh;
        const newNombre =  req.body.nombre;
        const vehRef = await db.collection("vehiculos").doc(idveh)
        .update({
            nombre: newNombre
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