const { db } = require("../firebase/providerFirestore");
const SchemaVehiculo = require('../schemas/SchemaVehiculo');

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



async function cvehiculo(req, res, next) {
    try {
      console.log(req.body)
      const { error } = SchemaVehiculo.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
        next();
      }
      else {
        const vehiculo = {
          id: db.collection("vehiculos").doc().id,
          nombre : req.body.nombre,
          modelo : req.body.modelo,
          anio : req.body.anio,
          motor :  req.body.motor,
          color :  req.body.color, 
          rin :  req.body.rin,
          imagenes : req.body.imagenes,
          placa : req.body.placa,
          otros : req.body.otros,
          precio: req.body.precio
        }
        console.log(vehiculo);
        const usuariodoc = await db.collection("vehiculos").doc(vehiculo.id).set(vehiculo);
        res.status(200).send("Vehiculo agregado correctamente")
        next();
      }
    }
  
    catch (error) {
      res.status(400).send("Error al insertar el Vehiculo, revisa la informacion que envias en el formu")
      console.error(error);
      next();
    }
  };
  
  async function rvehiculo(req, res, next) {
    try {
      const userRef = db.collection("vehiculos");
      const response = await userRef.get();
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      res.json(responseArr);
    }
    catch (error) {
      res.status(400).send("Error al cargar vehiculo en la plataforma");
      res.json(error);
    }
  };
  
  async function rvehiculobyid(req, res, next) {
    try {
      const id = req.params.idveh;
      const userRef = db.collection("vehiculos").doc(id);
      const response = await userRef.get().then((doc) => {
        if (doc.exists) {
          let responseArr = [];
          responseArr.push(doc.data());
          res.status(200).json(responseArr);
          next();
        } else {
          res.status(400).send('El vehiculo no existe');
        }
      })
    }
    catch (error) {
      res.json(error);
    }
  };
  
  async function uvehiculo(req, res, next) {
    try {
      const id = req.params.idveh
      console.log(req.params)
      const { error } = SchemaVehiculo.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      else {
        const vehiculo = {
          Newnombre : req.body.nombre,
          Newmodelo : req.body.modelo,
          Newanio : req.body.anio,
          Newmotor :  req.body.motor,
          Newcolor :  req.body.color, 
          Newrin :  req.body.rin,
          Newimagenes : req.body.imagenes,
          Newplaca : req.body.placa,
          Newotros : req.body.otros,
          Newprecio: req.body.precio
        }
        const vehiculodoc = await db.collection("vehiculos").doc(id).update({
          nombre : vehiculo.Newnombre,
          modelo : vehiculo.Newmodelo,
          anio : vehiculo.Newanio,
          motor :  vehiculo.Newmotor,
          color :  vehiculo.Newcolor, 
          rin :  vehiculo.Newrin,
          imagenes : vehiculo.Newimagenes,
          placa : vehiculo.Newplaca,
          otros : vehiculo.Newotros,
          precio: vehiculo.Newprecio
        })
        res.status(200).send("Vehiculo actualizado con exito");
      }}
       catch (error) {
        res.status(400).send("Vehiculo no existe en la base de datos");
      console.error(error);
    }
  };
  
  async function dvehiculo(req, res, next) {
    try {
      const id = req.params.idveh
      const usuario = await db.collection("vehiculos").doc(id).delete().then((doc) => {
        if (doc.exists) {
          res.status(200).send("Vehiculo eliminado con exito");
        }
        else {
          res.status(400).send("Vehiculo no existe en la base de datos");
        }
      })
    }
    catch (error) {
      console.error(error);
    }
}


module.exports = { obtenerVehiculos, agregarVehiculos , actualizarVehiculo, eliminarVehiculos, cvehiculo, rvehiculo, rvehiculobyid, uvehiculo, dvehiculo}