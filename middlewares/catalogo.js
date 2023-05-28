const { object } = require("joi");
const { db } = require("../firebase/providerFirestore");
const { traerCatalogo } = require('../helpers/catalogo')
const axios = require("axios");

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
    //Logica de actualizar
    next();
}

async function agregarImagen(imagenes, idVehiculo) {
    try {
      const id = idVehiculo;
      const collectionRef = db.collection('vehiculos').doc(id);
      let vehiculo = await consultarImagenes(idVehiculo);
      
      let imagenIndex = Object.keys(vehiculo).length + 1;

      imagenes.forEach(img => {
        const clave = `url${imagenIndex}`;
        vehiculo[clave] = img;
        imagenIndex++;
      });

      const updateData = {
        imagenes: vehiculo
      };
  
      await collectionRef.update(updateData);
  
      res.estado = true;
      res.message = `Las imágenes se han agregado correctamente al vehículo ${idVehiculo}`;
  
      res.id = idVehiculo;
      next();
    } catch (error) {
    }
  }
  
  async function consultarImagenes(idVehiculo) {
    try {
      const collectionRef = db.collection('vehiculos');
      const querySnapshot = await collectionRef.where('id', '==', idVehiculo).get();
     
      if(querySnapshot.empty){
        return console.log(`No existe el vehiculo ${idVehiculo}`);
      }
     
      let result = [];
     
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      let autos = result[0].imagenes;

      return autos;

    } catch (error) {
      console.log(error);
      return [];
    }
  }


module.exports = { consultarCatalogo, desactivarDisponible, actualizarPlaca, agregarImagen }