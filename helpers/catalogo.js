const { catalog , url } = require("../whatsappCatalog/config.js");
const axios = require("axios");

async function traerCatalogo() {
  let productos = [];
  try {
    const response = await axios.post(url,catalog);
    const data = response.data;
    console.log(data)
    const products =
      data.data.xwa_product_catalog_get_product_catalog.product_catalog //el diablo 
        .products;
    products.forEach((item) => {
      let images = [];
      item.media.images.forEach((image) => {
        images.push(image.original_image_url);
      });

      productos.push({
        id: item.id,
        name: item.name,
        description: item.description,
        images: images,
        price: item.price,
      });
    });
    
  return productos;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  traerCatalogo
};