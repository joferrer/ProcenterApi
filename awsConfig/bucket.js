const multer = require('multer');
const AWS = require('aws-sdk');

// Configuración de Multer para almacenar la imagen en memoria
const upload = multer();

// Configuración de AWS SDK
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY_AWS
});

module.exports = { upload , AWS};