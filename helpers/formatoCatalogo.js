const Vehiculo = require('../schemas/SchemaVehiculo.js');

    //Funcion para dar formato a JSON del texto del catalogo    
    const regexMark = /\b(Acura|Alfa Romeo|Aston Martin|Audi|Bentley|BMW|Bugatti|Buick|Cadillac|Chevrolet|Chrysler|Citroën|Citroen|Dacia|Daewoo|Daihatsu|Dodge|Ferrari|Fiat|Ford|Geely|Genesis|GMC|Honda|Hummer|Hyundai|Infiniti|Isuzu|Jaguar|Jeep|Kia|Koenigsegg|Lada|Lamborghini|Lancia|Land Rover|Lexus|Lincoln|Lotus|Maserati|Maybach|Mazda|McLaren|Mercedes|Mercedes-Benz||Mercedes Benz|Mercury|MG|Mini|Mitsubishi|Nissan|Oldsmobile|Opel|Pagani|Peugeot|Porsche|RAM|Renault|Rolls-Royce|Saab|Saturn|Scion|Seat|Skoda|Smart|SsangYong|Subaru|Suzuki|Tesla|Toyota|Vauxhall|Volkswagen|Volvo)\b/gi; //ta bien

    const regexColor = /(?:COLOR\s*)(\S.*?)\s*\n/i; //ta bien
    const regexYear = /[0-9]{4}/; //ta bien
    const regexModel = /\b\w+\b/g; //ta mal
    const regexDetails = /\n|(PLACAS DE[\s\S]*?✅)|(COLOR[\s\S]*?✅)|\nEN EL VALOR VA INCLUIDO LOS GASTOS TOTALES DE TRASPASO E IMPUESTOS AL 2022 YA PAGOS\n\n🎊CONTAMOS CON SISTEMA DE FINANCIACION🎊/mig;
    const regexMotor = /MOTOR\s(.+?)\n/i;
    const regexRin = /RIN\s(.+?)\n/i;

 function formatoCatalogo(item) {
    //Variables para el JSON
    let id, marca, modelo, anio, motor, precio, color, rin, imagenes, placa, otros, nombre;

    id = `${item.id}`;
    nombre = item.name;
    marca = item.name.match(regexMark);
    marca = marca != undefined ? marca[0] : "";
    color = item.description.match(regexColor);
    color[0] = color[0].slice(0, -1).replace("COLOR ", "");
    color = color[0];
    modelo = item.name.match(regexModel); //revisar
    anio = Number(item.name.match(regexYear));
    motor = item.description.match(regexMotor);
    motor = motor[0].replace("\n",'');
    rin =  item.description.match(regexRin);
    rin = rin != undefined ? rin[0] : "";
    imagenes = item.images;
    precio = item.price / 1000;
    
    otros = item.description.replace(/\n{2}[\s\S]*/, "\n\n");
    otros = otros.replace(regexDetails, "");
    otros = otros.split("✅");
    otros.splice(0, 1);
  
    let vehiculo = { 
      id : id,
      marca: marca,
      nombre: nombre,
      modelo: modelo,
      anio: anio,
      motor: motor,
      color: color,
      rin : rin,
      imagenes : imagenes,
      otros: otros,
      precio: precio,
      disponible: true
    };
    
    JSON.stringify(vehiculo);
    return vehiculo;
  }

  module.exports = {
    formatoCatalogo
  }
