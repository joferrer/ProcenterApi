
//Funcion para dar formato a JSON del texto del catalogo
 function formatoCatalogo(item) {
    //Variables para el JSON
    let id, mark, model, year, price, color, others, plate;
  
    //Regex para los atributos de los autos
    const regexMark = /\b(Toyota|Nissan|Honda|Ford|Chevrolet|Renault|Kia|Peugeot|BMW|Mazda|Mitsubishi)\b/gi;
    const regexColor = /(?:COLOR\s*)(\S.*?)\s*\n/i;
    const regexYear = /[0-9]{4}/;
    const regexPlate = /PLACAS DE\s(.+?)\n/i;
    const regexModel = /\b\w+\b/g;
    const regexDetails = /\n|(PLACAS DE[\s\S]*?✅)|(COLOR[\s\S]*?✅)|\nEN EL VALOR VA INCLUIDO LOS GASTOS TOTALES DE TRASPASO E IMPUESTOS AL 2022 YA PAGOS\n\n🎊CONTAMOS CON SISTEMA DE FINANCIACION🎊/mig;
  
    //Encuentra coincidencias y elimina ciertos caracteres o frases innecesarias
    id = item.id;
    mark = item.name.match(regexMark);
    color = item.description.match(regexColor);
    color[0] = color[0].slice(0, -1).replace("COLOR ", "");
    model = item.name.match(regexModel);
    year = item.name.match(regexYear);
    plate = item.description.match(regexPlate);
    plate = plate[0].slice(0, -1).replace("PLACAS DE ", "")
    price = item.price / 1000;
    others = item.description.replace(/\n{2}[\s\S]*/, "\n\n");
    others = others.replace(regexDetails, "");
    others = others.split("✅");
    others.splice(0, 1);
  
    //console.log(item.description);
    //Modelo de JSON
    vehiculo = ({
      'id': id,
      'marca': mark[0],
      'modelo': model[1],
      'anio': year[0],
      'precio': price,
      'color': color[0],
      'imagenes': item.images,
      'placa': plate,
      'otros': others
    });
    return details;
  }

 //archivo JSON con los autos
 async function formatoJSON(data) {
    let text = await data;
    let fileText = "";
    const fileName = 'DB.json';
    let json = "";
    await text.forEach(item => {
      fileText = formatoCatalogo(item);
      json +=  JSON.stringify(fileText, null, 4) + ",";
    });

    try {
      fs.writeFile(fileName, json, (err) => {
        if (err) {
          console.error('Error al escribir en el archivo:', err);
        } else {
          console.log('Archivo guardado exitosamente.');
        }
      });
    } catch (error) {
      console.error('Error al convertir los datos a formato JSON:', error);
    }
  }

  module.exports = {
    descargarImagen,
    formatoCatalogo,
    formatoJSON
  }