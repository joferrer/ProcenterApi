const url = 'https://graph.whatsapp.com/graphql/catalog';
const requestBody = {
  access_token: "WA|787118555984857|7bb1544a3599aa180ac9a3f7688ba243",
  doc_id: "5456143974442934",
  variables: {
    request: {
      product_catalog: {
        jid: "573118931877@c.us",
        allow_shop_source: "ALLOWSHOPSOURCE_FALSE",
        width: "100",
        height: "100",
        limit: "10"
      },
    },
  },
  lang: "en_CO",
};

module.exports = {
  url,
  requestBody
};