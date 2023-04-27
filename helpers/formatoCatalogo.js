const Vehiculo = require('../schemas/SchemaVehiculo.js');
const {traerCatalogo} = require('./catalogo.js');

//Funcion para dar formato a JSON del texto del catalogo    
    const regexMark = /\b(Toyota|Nissan|Honda|Ford|Chevrolet|Renault|Kia|Peugeot|BMW|Mazda|Mitsubishi|SUZUKI)\b/gi;
    const regexColor = /(?:COLOR\s*)(\S.*?)\s*\n/i;
    const regexYear = /[0-9]{4}/;
    const regexPlate = /PLACAS DE\s(.+?)\n/i;
    const regexModel = /\b\w+\b/g;
    const regexDetails = /\n|(PLACAS DE[\s\S]*?✅)|(COLOR[\s\S]*?✅)|\nEN EL VALOR VA INCLUIDO LOS GASTOS TOTALES DE TRASPASO E IMPUESTOS AL 2022 YA PAGOS\n\n🎊CONTAMOS CON SISTEMA DE FINANCIACION🎊/mig;
    const regexMotor = /MOTOR\s(.+?)\n/i;
    const regexRin = /RIN\s(.+?)\n/i;

 function formatoCatalogo(item) {
    //Variables para el JSON
    let id, marca, modelo, anio, motor, precio, color, rin, imagenes, placa, otros;

    id = Number(item.id);
    marca = item.name.match(regexMark);
    marca = marca[0];
    color = item.description.match(regexColor);
    color[0] = color[0].slice(0, -1).replace("COLOR ", "");
    color = color[0];
    modelo = item.name.match(regexModel);
    anio = Number(item.name.match(regexYear));
    motor = item.description.match(regexMotor);
    rin =  item.description.match(regexRin);
    imagenes = item.images;
    //placa
    placa = item.description.match(regexPlate);
    placa = placa[0].slice(0, -1).replace("PLACAS DE ", "")
    //precio
    precio = item.price / 1000;
    //otros
    otros = item.description.replace(/\n{2}[\s\S]*/, "\n\n");
    otros = otros.replace(regexDetails, "");
    otros = otros.split("✅");
    otros.splice(0, 1);
  
    let vehiculo = { 
      id : id,
      marca: marca,
      modelo: modelo,
      anio: anio,
      motor: motor,
      color: color,
      rin : rin,
      imagenes : imagenes,
      placa: placa,
      otros: otros,
      precio: precio
    };
    
  
    let vehiculoDTO = new Vehiculo(vehiculo);
    JSON.stringify(vehiculoDTO)
    return vehiculoDTO;
  }

  module.exports = {
    formatoCatalogo
  }