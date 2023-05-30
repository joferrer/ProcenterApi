const Joi = require('joi');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function validarNumeroTelefonico(numero) {
  try {
    const numeroParseado = phoneUtil.parse(numero);
    return phoneUtil.isValidNumber(numeroParseado);
  } catch (error) {
    return false;
  }
} 

const telefonoSchema = Joi.string().custom((value, helpers) => {
  if (validarNumeroTelefonico(value)) {
    return value; // El número telefónico es válido, se devuelve el valor original
  } else {
    return helpers.error('any.invalid', {
      message: 'Número telefónico inválido',
    });
  }
}, 'Validar número telefónico');

const firestoreIdRegex = /^[a-zA-Z0-9]{20}$/;

  
const SchemaAdquisicion = Joi.object({
  id: Joi.string(),
  nombre: Joi.string().regex(/^[\w\s]+$/).required()
  .messages({
    'string.base': 'El nombre debe ser un texto válido',
    'string.empty': 'El nombre no puede estar vacío',
    'string.pattern.base': 'El nombre no puede contener caracteres especiales',
    'any.required': 'El nombre es obligatorio'
  }),
  marca: Joi.string().regex(/^[a-zA-Z0-9\-]+$/).required()
  .messages({
    'string.base': 'La marca debe ser un texto válido',
    'string.empty': 'La marca no puede estar vacía',
    'string.pattern.base': 'La marca no puede contener caracteres especiales, excepto el guion',
    'any.required': 'La marca es obligatoria'
  }),
modelo: Joi.string().regex(/^[\w\s]+$/).required()
  .messages({
    'string.base': 'El modelo debe ser un texto válido',
    'string.empty': 'El modelo no puede estar vacío',
    'string.pattern.base': 'El modelo no puede contener caracteres especiales',
    'any.required': 'El modelo es obligatorio'
  }),
  color: Joi.string().regex(/^[^\d\s]+$/).required()
    .messages({
      'string.base': 'El color debe ser un texto válido',
      'string.empty': 'El color no puede estar vacío',
      'string.pattern.base': 'El color no puede contener números o caracteres especiales',
      'any.required': 'El color es obligatorio'
    }),
  motor: Joi.string().alphanum().required()
    .messages({
      'string.base': 'El motor debe ser una cadena alfanumérica',
      'string.empty': 'El motor no puede estar vacío',
      'any.required': 'El motor es obligatorio'
    }),
  placa: Joi.string().regex(/^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z])$/).required()
    .messages({
      'string.base': 'La placa debe ser una placa colombiana válida',
      'string.empty': 'La placa no puede estar vacía',
      'string.pattern.base': 'La placa debe tener un formato válido',
      'any.required': 'La placa es obligatoria'
    }),
  anio: Joi.number().integer().max(new Date().getFullYear()).required()
    .messages({
      'number.base': 'El año debe ser un número',
      'number.empty': 'El año no puede estar vacío',
      'number.integer': 'El año debe ser un número entero',
      'number.max': 'El año no puede ser mayor al actual',
      'any.required': 'El año es obligatorio'
    }),
  precioDueno: Joi.number().max(999999999999).required()
    .messages({
      'number.base': 'El precio del dueño debe ser un número',
      'number.empty': 'El precio del dueño no puede estar vacío',
      'number.max': 'El precio del dueño no puede ser mayor a 999,999,999,999',
      'any.required': 'El precio del dueño es obligatorio'
    }),
  fechaMatricula: Joi.date().max('now').required(),
  soat: Joi.boolean().required()
    .messages({
      'boolean.base': 'El campo SOAT debe ser un valor booleano',
      'any.required': 'El campo SOAT es obligatorio'
    }),
    cedula: Joi.number()
    .positive()
    .min(1000000)
    .max(99999999999)
    .required()
    .messages({
      'number.base': 'La cédula debe ser un número.',
      'number.empty': 'La cédula no debe estar vacía.',
      'number.integer': 'La cédula debe ser un número entero.',
      'number.positive': 'La cédula debe ser un número positivo.',
      'number.min': 'La cédula debe tener al menos 7 dígitos.',
      'number.max': 'La cédula no puede tener más de 11 dígitos.',
      'any.required': 'La cédula es un campo requerido.',
    }),
  nombredueno: Joi.string().regex(/^[^\d\s]+$/).required()
    .messages({
      'string.base': 'El nombre del dueño debe ser un texto válido',
      'string.empty': 'El nombre del dueño no puede estar vacío',
      'string.pattern.base': 'El nombre del dueño no puede contener números o caracteres especiales',
      'any.required': 'El nombre del dueño es obligatorio'
    }),
  prenda: Joi.string().required()
    .messages({
      'string.base': 'La prenda debe ser una cadena de texto',
      'string.empty': 'La prenda no puede estar vacía',
      'any.required': 'La prenda es obligatoria'
    }),
    correo: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .max(254)
    .required()
    .messages({
      'string.base': 'El correo electrónico debe ser una cadena de texto.',
      'string.empty': 'El correo electrónico no debe estar vacío.',
      'string.email': 'El correo electrónico debe tener un formato válido.',
      'string.max': 'El correo electrónico no debe exceder los {#limit} caracteres.',
      'any.required': 'El correo electrónico es un campo requerido.',
    }),
  telefono:  telefonoSchema,
  impuestos: Joi.boolean().required()
    .messages({
      'boolean.base': 'El campo impuestos debe ser un valor booleano',
      'any.required': 'El campo impuestos es obligatorio'
    }),
  detalles: Joi.string().allow('').required()
    .messages({
      'string.base': 'Los detalles deben ser una cadena de texto',
      'string.empty': 'Los detalles no pueden estar vacíos',
      'any.required': 'Los detalles son obligatorios'
    }),
  estado: Joi.boolean(),
  idpublic: Joi.string()
  .regex(firestoreIdRegex)
  .required()
  .messages({
    'string.base': 'El ID del publicista debe ser una cadena de texto.',
    'string.pattern.base': 'El ID del publicista es inválido.',
    'any.required': 'El ID del publicista es un campo obligatorio.',
  })
});

module.exports = SchemaAdquisicion