import { whatsappConfig, whatsappUrl } from "../whatsappCatalog/config.js";

async function traerCatalogo() {
    let productos = [];
    try {
      const response = await fetch(whatsappUrl, whatsappConfig);
      const data = await response.json();
      const products = data.data.xwa_product_catalog_get_product_catalog.product_catalog.products;
  
      products.forEach(item => {
        let images = [];
        item.media.images.forEach(image => {
          images.push(image.original_image_url);
        });
        // Corregir
        productos.push({ 'id': item.id, 'name': item.name, 'description': item.description, 'images': images, 'price': item.price });
      });
      return productos;
  
    } catch (error) {
      throw new Error(error);
    }
  }

module.exports = {
    traerCatalogo
}