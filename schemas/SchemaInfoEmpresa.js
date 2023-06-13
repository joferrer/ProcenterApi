const Joi = require('joi');

const SchemaInfoEmpresa = Joi.object({
  mision: Joi.string()
    .min(3)
    .max(1024)
    .regex(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({ 
      'string.base': 'La misión debe ser una cadena de texto.',
      'string.empty': 'La misión no debe estar vacía.',
      'string.min': 'La misión debe tener al menos {#limit} caracteres.',
      'string.max': 'La misión no debe exceder los {#limit} caracteres.',
      'string.pattern.base':   'El nombre solo puede contener letras y espacios.',
      'any.required': 'La misión es un campo requerido.',
    }),
//
  vision: Joi.string()
  .min(3)
  .max(1024)
  .regex(/^[a-zA-Z0-9 ]+$/)
  .required()
  .messages({
    'string.base': 'La vision  debe ser una cadena de texto.',
    'string.empty': 'La vision no debe estar vacía.',
    'string.min': 'La vision debe tener al menos {#limit} caracteres.',
    'string.max': 'La vision no debe exceder los {#limit} caracteres.',
    'string.pattern.base': 'El nombre solo puede contener letras y espacios.',
    'any.required': 'La vision es un campo requerido.',
  }),

  quienesSomos: Joi.string()
    .min(3)
    .max(1024)
    .regex(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'El campo "Quiénes somos" debe ser una cadena de texto.',
      'string.empty': 'El campo "Quiénes somos" no debe estar vacío.',
      'string.min': 'El campo "Quiénes somos" debe tener al menos {#limit} caracteres.',
      'string.max': 'El campo "Quiénes somos" no debe exceder los {#limit} caracteres.',
      'string.pattern.base': 'El nombre solo puede contener letras y espacios.',
      'any.required': 'El campo "Quiénes somos" es requerido.',
    }),
});

module.exports = { SchemaInfoEmpresa };
