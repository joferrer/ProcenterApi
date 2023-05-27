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

const vehvalidateDocumentId = async (vehiculo) => {
  if (!firestoreIdRegex.test(vehiculo)) {
    throw new Error('ID de documento no válido');
  }

  const docRef = db.collection("vehiculos").doc(vehiculo);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error('El documento especificado no existe');
  }

  return vehiculo;
}



const asesorvalidateDocumentId = async (asesor) => {
  if (!firestoreIdRegex.test(asesor)) {
    throw new Error('ID de documento no válido');
  }

  const docRef = db.collection("usuarios").doc(asesor);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error('El documento especificado no existe');
  }

  return asesor;
}



const schemaVenta = Joi.object({
  fechaCreacion: extendedJoi.date().format('DD/MM/YYYY'),
  idvehiculo: Joi.string()
      .custom(vehvalidateDocumentId)
      .regex(/^[^<>]+$/)
      .required()
      .messages({
        'string.base': 'El ID del vehículo debe ser una cadena de texto.',
        'any.required': 'El ID del vehículo es un campo obligatorio.',
        'any.invalid': 'El ID del vehículo es inválido.',
        'string.pattern.base': 'El ID del vehículo no puede contener caracteres HTML.',
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
    telefono:  telefonoSchema
  }),
  asesor: Joi.object({
    idasesor: Joi.string()
      .custom(asesorvalidateDocumentId)
      .regex(/^[^<>]+$/)
      .required()
      .messages({
        'string.base': 'El ID del asesor debe ser una cadena de texto.',
        'any.required': 'El ID del asesor es un campo obligatorio.',
        'any.invalid': 'El ID del asesor es inválido.',
        'string.pattern.base': 'El ID del asesor no puede contener caracteres HTML.',
      }),
  }),
});

const schemaVentaActualizacion = Joi.object({
  fechaCreacion: Joi.date()
    .iso()
    .max('now')
    .required()
    .messages({
      'date.base': 'La fecha de creación debe ser una fecha válida.',
      'date.format': 'La fecha de creación debe tener un formato ISO válido.',
      'date.max': 'La fecha de creación no puede ser posterior a la fecha actual.',
      'any.required': 'La fecha de creación es un campo obligatorio.',
    }),
  pago: Joi.object({
    precio: Joi.number()
      .min(1)
      .max(99999999999)
      .required()
      .messages({
        'number.base': 'El precio debe ser un número válido.',
        'number.min': 'El precio debe ser mayor o igual a 1.',
        'number.max': 'El precio no puede ser mayor a 99,999,999,999.',
        'any.required': 'El precio es un campo obligatorio.',
      }),
    idvehiculo: Joi.string()
      .custom(vehvalidateDocumentId)
      .regex(/^[^<>]+$/)
      .required()
      .messages({
        'string.base': 'El ID del vehículo debe ser una cadena de texto.',
        'any.required': 'El ID del vehículo es un campo obligatorio.',
        'any.invalid': 'El ID del vehículo es inválido.',
        'string.pattern.base': 'El ID del vehículo no puede contener caracteres HTML.',
      }),
  }),
  estado: Joi.object({
    contexto: Joi.string().valid('PROCESO', 'CANCELADO', 'VENDIDO').required(), 
    descripcion: Joi.string().min(3).max(255).required()
  }),
  cliente: Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(40)
        .regex(/^[a-zA-Z0-9 ]*$/)
        .required()
        .messages({
            'string.base': 'El nombre debe ser una cadena de texto.',
            'string.empty': 'El nombre no debe estar vacío.',
            'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
            'string.max': 'El nombre no debe exceder los {#limit} caracteres.',
            'string.pattern.base': 'El nombre solo puede contener letras, números y espacios.',
            'any.required': 'El nombre es un campo requerido.',
        }),
        cedula:  Joi.number()
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
    edad: Joi.number().integer().min(18).max(99).required().messages({
        'number.base': 'La edad debe ser un número.',
        'number.integer': 'La edad debe ser un número entero.',
        'number.min': 'La edad debe ser mayor o igual a 18.',
        'number.max': 'La edad debe ser menor o igual a 99.',
        'any.required': 'La edad es un campo requerido.'
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
    imagen: Joi.string()
        .uri()
        .messages({
            'string.base': 'La imagen debe ser una cadena de texto.',
            'string.uri': 'La imagen debe tener un formato de URI válido.',
        }),
    telefono: Joi.number()
        .min(3000000000)
        .max(3999999999)
        .required()
        .messages({
            'number.base': 'El teléfono debe ser un número.',
            'number.empty': 'El teléfono no debe estar vacío.',
            'number.min': 'El teléfono debe ser mayor o igual a {#limit}.',
            'number.max': 'El teléfono debe ser menor o igual a {#limit}.',
            'any.required': 'El teléfono es un campo requerido.',
        })
  }),
  asesor: Joi.object({
    idasesor: Joi.string()
      .custom(asesorvalidateDocumentId)
      .regex(/^[^<>]+$/)
      .required()
      .messages({
        'string.base': 'El ID del asesor debe ser una cadena de texto.',
        'any.required': 'El ID del asesor es un campo obligatorio.',
        'any.invalid': 'El ID del asesor es inválido.',
        'string.pattern.base': 'El ID del asesor no puede contener caracteres HTML.',
      }),
  }),
});


module.exports = {schemaVenta, schemaVentaActualizacion};

