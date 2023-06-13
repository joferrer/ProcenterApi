const Joi = require('joi')
const SchemaResenia = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre no debe estar vacío.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no debe exceder los {#limit} caracteres.',
      'string.pattern.base': 'El nombre solo puede contener letras y espacios.',
      'any.required': 'El nombre es un campo requerido.',
    }),
    comentarios: Joi.string()
    .min(3)
    .max(540)
    .regex(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'La reseña debe ser una cadena de texto.',
      'string.empty': 'La reseña no debe estar vacía.',
      'string.min': 'La reseña debe tener al menos {#limit} caracteres.',
      'string.max': 'La reseña no debe exceder los {#limit} caracteres.',
      'string.pattern.base': 'La reseña solo puede contener numeros, letras y espacios.',
      'any.required': 'La reseña es un campo requerido.',
    })
  
})
module.exports = {SchemaResenia}