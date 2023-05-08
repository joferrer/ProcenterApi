const { db } = require("../firebase/providerFirestore");


//Obtain a list of vehicle of the collection "Vehicules"
async function obtenerVehiculos(req, res, next){
    try {
        const userRef = db.collection("vehiculos");
        const response = await userRef.get();
        let responseArr = [];

        response.forEach ( doc => {
            responseArr.push(doc.data());
        }); 
        res.json(responseArr);
    }
    catch (error) {
        res.json(error);
    }
};

//Insert a new vehicle in the database
async function agregarVehiculos(req, res, next){
    try{
        const vehJson ={
            idveh: newIdVeh,
            nombre: req.body.nombre
        };
        const vehRef = await db.collection("vehiculos").doc(id).set(vehJson);
        res.send("Vehiculo agregado correctamente")
        res.status(200);
    }

    catch(error){
        console.error(error);
    }
};

//Update a vehicle in the database using the id atribute
async function actualizarVehiculo(req, res, next){
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
};

//Delete a vehicle with a params named id in the url, where the params deleted the document 
async function eliminarVehiculos(req, res, next){
    try{
    const vehRef = await db.collection("vehiculos").doc(req.params.id).delete();
    res.send("Vehiculo eliminado con exito");
    res.status(200);
    }
    catch (error) {
        console.error(error);
    }
};
module.exports = { obtenerVehiculos, agregarVehiculos , actualizarVehiculo, eliminarVehiculos }