const { object } = require("joi");
const { db } = require("../firebase/providerFirestore");
const { traerCatalogo } = require('../helpers/catalogo')
const axios = require("axios");
const SchemaPlaca = require("../schemas/SchemaPlaca");

async function consultarCatalogo(req, res, next) {
    try {
      const collectionRef = await db.collection('vehiculos');
      const querySnapshot = await collectionRef.where('disponible', '==', true).get();
      const autos = [];
      if(querySnapshot.empty){
        req.autos = {estado:false, mensaje: "No hay ningun vehiculo disponible en el catalogo"}
        next(); 
      }
      querySnapshot.forEach((doc) => {
            autos.push(doc.data());
      });
      
      req.autos = autos;
      next();
    }
    catch(error){
        return console.log(error);
    }
}


async function consultarCatalogoEcommerce(req, res, next) {
  try {
    const collectionRef = await db.collection('vehiculos');
    const querySnapshot = await collectionRef.where('disponible', '==', true).limit(5).get();
    const autos = [];
    if (querySnapshot.empty) {
      req.autos = { estado: false, mensaje: "No hay ningún vehículo disponible en el catálogo" };
      next();
    } else {
      querySnapshot.forEach((doc) => {
        autos.push(doc.data());
      });
      req.autos = autos;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ estado: false, mensaje: "Ha ocurrido un error al consultar el catálogo" });
  }
}





async function desactivarDisponible(req, res, next) {
    let idVehiculo = req.params.id;
    try {
        const id = idVehiculo.replace(':',''); //revisamos despues
        const collectionRef = db.collection('vehiculos').doc(id);
        const updateData = { disponible: false};
        await collectionRef.update(updateData);

        res.estado = true
        res.message = `El vehiculo ${idVehiculo} se ha deshabilitado correctamente `;

        res.id = idVehiculo;
        next(); 
    }
    catch(error){
        res.estado = false;
        res.message = `No se ha encontrado el vehiculo ${idVehiculo}`;
        next();
    }
}

async function actualizarPlaca(req, res, next){
  try {
    const { idvehiculo, placa } = req.body;
    const { error } = SchemaPlaca.SchemaPlaca.validate(req.body);
      if (error) {
        res.status(400).send({"estado": false, "error":error.details[0].message});
        next();
      }
      
    const vehRef = await  db.collection("vehiculos").doc(idvehiculo);
    const vehPlaca =  await db.collection("vehiculos").where('placa', '==', placa);
    const snapshot = await vehPlaca.get();
    const response = await vehRef.get().then((doc) => {
        if (doc.exists) {
    if (snapshot.empty) {
      vehRef.update({
        placa: placa
      });
      res.estado =  true;
      res.message = `Actualizacion de placa exitosa`;
      next();
    } else {
      res.estado =  false;
      res.message = `La placa  ${placa} ya se encuentra registrada`;
      next();
    }
  }
  else{
    res.estado =  false;
    res.message = `El vehiculo con ID: ${idvehiculo} no existe`;
    next();
  }})}
  catch (error) {
    console.log(error);
    res.status(400).send({ estado: false, mensaje: error });
    next();
  }
    
}

async function agregarImagen(nuevasImagenes, idVehiculo) {
  try {
    const id = idVehiculo;
    const collectionRef = db.collection('vehiculos').doc(id);

    let vehiculoImagenes = await consultarImagenes(idVehiculo);
    console.log(vehiculoImagenes)
    if (!vehiculoImagenes) {
      // El vehículo no existe, se retorna un mensaje de error
      return { estado: false, mensaje: `El vehículo ${idVehiculo} no ha sido encontrado` };
    }

    // Asignar las nuevas imágenes directamente a la propiedad imagenes
    nuevasImagenes.forEach(e => {
      vehiculoImagenes.push(e);
    });

    let updateData = {
      imagenes: vehiculoImagenes
    };

    await collectionRef.update(updateData);
    // Las imágenes se han agregado correctamente al vehículo
    return { estado: true, mensaje: `Las imágenes se han agregado correctamente al vehículo ${idVehiculo}`, imagenes : vehiculoImagenes };
  } catch (error) {
    console.error(error);
    return { estado: false, mensaje: 'Ha ocurrido un error al agregar las imágenes' };
  }
}

async function consultarImagenes(idVehiculo) {
  try {
    const collectionRef = db.collection('vehiculos');
    const querySnapshot = await collectionRef.where('id', '==', idVehiculo).get();

    if (querySnapshot.empty) {
      return null;
    }

    let result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    let autos = result[0].imagenes;

    return autos;
  } catch (error) {
    console.error(error);
    return null;
  }
}



module.exports = { consultarCatalogo,consultarCatalogoEcommerce, desactivarDisponible,  actualizarPlaca, agregarImagen,consultarImagenes }