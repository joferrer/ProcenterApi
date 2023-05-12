const Joi = require('joi');

const SchemaVehiculo = Joi.object({
    marca : Joi.string().min(2).max(40).regex(/^[a-zA-Z0-9 ]*$/).required(),
    modelo : Joi.string().min(2).max(40).regex(/^[a-zA-Z0-9 ]*$/).required(),
    anio : Joi.number().min(1960).max(2023).required(),
    motor : Joi.string().min(2).max(40).regex(/^[a-zA-Z0-9 ]*$/).required(),
    color : Joi.string().min(2).max(40).regex(/^[a-zA-Z0-9 ]*$/).required(),
    rin : Joi.string().min(2).max(40).regex(/^[a-zA-Z0-9 ]*$/).required(),
    imagenes : Joi.object({
        url1: Joi.string().uri(),
        url2: Joi.string().uri(),
        url3: Joi.string().uri()
      }),
        placa : Joi.string().min(6).max(6).regex(/^[A-Z]{3}\d{3}$/).required(),
        otros :Joi.string().min(3).max(2000).required(),
        precio: Joi.number().min(1).max(99999999999).required()
    });

module.exports = SchemaVehiculo