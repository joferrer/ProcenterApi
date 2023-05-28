const multer = require('multer');
const AWS = require('aws-sdk');
const keys = require('./aws-credencial.json');

// Configuración de Multer para almacenar la imagen en memoria
const upload = multer();

// Configuración de AWS SDK
AWS.config.update({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = { upload , AWS};