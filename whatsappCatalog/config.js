const catalog = {
  access_token: "WA|787118555984857|7bb1544a3599aa180ac9a3f7688ba243",
  doc_id: "5456143974442934",
  variables: {
    request: {
      product_catalog: {
        jid: "573118931877@c.us",
        allow_shop_source: "ALLOWSHOPSOURCE_FALSE ",
        width: "100",
        height: "100",
        limit: "20"
       
      },
    },
  },
  headers: {
    "Content-Type": "application/json",
    Origin: "https://web.whatsapp.com",
    Referer: "https://web.whatsapp.com",
  },
};
const url = "https://graph.whatsapp.com/graphql/catalog";

module.exports = {
  catalog,
  url
};
