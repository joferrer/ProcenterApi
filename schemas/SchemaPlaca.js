const Joi = require('joi')
const SchemaPlaca = Joi.object({
    idvehiculo:   Joi.number()
    .integer()
    .min(1000000000000)
    .max(9999999999999999999999999)
    .required()
    .messages({
      'number.base': 'El id de vehiculo debe ser un número.',
      'number.integer': 'El vehiculo debe ser un entero.',
      'number.min': 'El vehiculo debe tener al menos 12 dígitos.',
      'number.max': 'El vehiculo debe tener como máximo 25 dígitos.',
    }),  
    placa: Joi.string().regex(/^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z])$/).required()
    .messages({
      'string.base': 'La placa debe ser una placa colombiana válida',
      'string.empty': 'La placa no puede estar vacía',
      'string.pattern.base': 'La placa debe tener un formato válido',
      'any.required': 'La placa es obligatoria'
    })
})
module.exports = {SchemaPlaca}
    