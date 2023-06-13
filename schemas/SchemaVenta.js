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

const JoiDate = require('@hapi/joi-date');
const extendedJoi = Joi.extend(JoiDate);
const { db, auth } = require("../firebase/providerFirestore");
const admin = require("firebase-admin");

const firestoreIdRegex = /^[a-zA-Z0-9]{20}$/;

const schemaVenta = Joi.object({
  fechaCreacion: extendedJoi.date().format('DD/MM/YYYY'),
  idvehiculo:  Joi.number()
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
  descripcion: Joi.string()
  .min(3)
  .max(1024)
  .regex(/^[a-zA-Z ]+$/)
  .required()
  .messages({
    'string.base': 'La descripción debe ser una cadena de texto.',
    'string.empty': 'La descripción no debe estar vacía.',
    'string.min': 'La descripción debe tener al menos {#limit} caracteres.',
    'string.max': 'La descripción no debe exceder los {#limit} caracteres.',
    'string.pattern.base': 'La descripción solo puede contener letras y espacios.',
    'any.required': 'La descripción es un campo requerido.',
  }),

precio: Joi.number()
  .positive()
  .min(1000000)
  .max(99999999999)
  .required()
  .messages({
    'number.base': 'El precio debe ser un número.',
    'number.empty': 'El precio no debe estar vacío.',
    'number.integer': 'El precio debe ser un número entero.',
    'number.positive': 'El precio debe ser un número positivo.',
    'number.min': 'El precio debe ser al menos {#limit}.',
    'number.max': 'El precio no puede ser mayor a {#limit}.',
    'any.required': 'El precio es un campo requerido.',
  }),

  cliente: Joi.object({
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

    telefono: telefonoSchema,
  }),
//
  idasesor: Joi.string()
    .regex(firestoreIdRegex)
    .required()
    .messages({
      'string.base': 'El ID del asesor debe ser una cadena de texto.',
      'string.pattern.base': 'El ID del asesor es inválido.',
      'any.required': 'El ID del asesor es un campo obligatorio.',
    }),
});

module.exports = schemaVenta;
