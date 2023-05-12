const Joi = require('joi');

const SchemaUsuario = Joi.object({
        nombre : Joi.string().min(3).max(40).regex(/^[a-zA-Z0-9 ]*$/).required(),
        correo: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .max(254)
        .required()
        .messages({
          'string.base': 'El correo electrónico debe ser una cadena de texto.',
          'string.empty': 'El correo electrónico no puede estar vacío.',
          'string.email': 'El correo electrónico no es válido.',
          'string.max': 'El correo electrónico no puede tener más de {#limit} caracteres.',
          'any.required': 'El correo electrónico es obligatorio.',
        }),
        imagen :  Joi.string().uri(), 
        telefono : Joi.number().min(3000000000).max(3999999999).required(),
        rol : Joi.string().valid('ASESOR', 'CLIENTE','ADMIN','PUBLIC')
    });

module.exports = SchemaUsuario;
