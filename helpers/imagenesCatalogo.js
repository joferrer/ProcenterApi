const fs = require('fs');

async function descargarImagen(uri, path, filename) {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    // console.log(buffer);
    fs.writeFileSync(`${path}/${filename}`, buffer, function (err) {
      if (err) throw err;
      console.log(`Archivo ${filename} guardado en ${path}`);
    });
  
  };
  
  //Recorrer imagenes de vehiculo
  async function obtenerImagenes() {
    let data = await getCatalog();
    let id = 0;
    let dir = 'media';
  
    //Crea la carpeta media 
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    //Recorre cada uno de los datos
    data.forEach(item => {
      let dir = `media/${id}`;
      let filename = `${item.id}.png`;
  
      //crea la carpeta para un item
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      id++;
      //recorre cada uno de los links de cada item
      item.images.forEach((image, index) => {
        const filename = `${item.id}_${index}.png`;
        descargarImagen(image, dir, filename);
      });
    });
  }


  module.exports = {
    descargarImagen,
    obtenerImagenes
  }