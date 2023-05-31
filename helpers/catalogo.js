const { requestBody, url } = require("../whatsappCatalog/config.js");
const axios = require("axios");

async function traerCatalogo() {
  let productos = [];
  let products = [];
  try {
    const response = await axios.post(url, requestBody);
    let counter = response.data.data.xwa_product_catalog_get_product_catalog.product_catalog.products.length;
    productos.push(response.data.data.xwa_product_catalog_get_product_catalog.product_catalog.products);
    let after = response.data.data.xwa_product_catalog_get_product_catalog.product_catalog.paging.after;
    
    while ( counter == 10 ) {
      let requestPaging;
      
      if( after != "" ){
        requestPaging = {
          access_token: "WA|787118555984857|7bb1544a3599aa180ac9a3f7688ba243",
          doc_id: "5456143974442934",
          variables: {
            request: {
              product_catalog: {
                jid: "573118931877@c.us",
                allow_shop_source: "ALLOWSHOPSOURCE_FALSE",
                after: `${after}`,
                width: "100",
                height: "100",
                limit: "10",
              },
            },
          },
          lang: "en_CO"
        };
      } else {
        break;
      }
      const response = await axios.post(url, requestPaging);
      productos.push(response.data.data.xwa_product_catalog_get_product_catalog.product_catalog.products);
      after = response.data.data.xwa_product_catalog_get_product_catalog.product_catalog.paging.after;
      counter = response.data.data.xwa_product_catalog_get_product_catalog.product_catalog.products.length
    }
    var arregloFinal = [].concat(...productos);

    arregloFinal.forEach((item) => {
      let images = [];
      item.media.images.forEach((image) => {
        images.push(image.original_image_url);
      });
      products.push({
        id: item.id,
        name: item.name,
        description: item.description,
        images: images,
        price: item.price,
      });
    });

    return products;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  traerCatalogo
};
