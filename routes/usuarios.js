const express = require('express');
const router = express.Router();
const { crearUsuario, 
        actualizarUsuario, 
        desactivarUsuario, 
        obtenerUsuarioById, 
        obtenerUsuarios,
        activarUsuario
    } = require("../middlewares/usuarios");

/**
 * Ruta para crear un nuevo usuario.
 *
 * @route POST /crear-usuario
 * @param {object} req - El objeto de solicitud.
 * @param {object} res - El objeto de respuesta.
 * @returns {void}
 */
router.post('/crear-usuario', crearUsuario, (req, res) => {
    res.json();
});

/**
 * Ruta para obtener todos los usuarios.
 *
 * @route GET /usuarios
 * @param {object} req - El objeto de solicitud.
 * @param {object} res - El objeto de respuesta.
 * @returns {void}
 */
router.get('/usuarios', obtenerUsuarios, (req, res) => {
    res.json();
});

/**
 * Ruta para obtener un usuario por su ID.
 *
 * @route GET /usuario/:id
 * @param {object} req - El objeto de solicitud.
 * @param {object} res - El objeto de respuesta.
 * @returns {void}
 */
router.get('/usuario/:id', obtenerUsuarioById, (req, res) => {
    res.json();
});

/**
 * Ruta para actualizar un usuario por su ID.
 *
 * @route PUT /usuario/:id
 * @param {object} req - El objeto de solicitud.
 * @param {object} res - El objeto de respuesta.
 * @returns {void}
 */
router.put('/uusuario/:id', actualizarUsuario, (req, res) => {
    res.json();
});

/**
 * Ruta para eliminar un usuario por su ID.
 *
 * @route DELETE /usuario/:id
 * @param {object} req - El objeto de solicitud.
 * @param {object} res - El objeto de respuesta.
 * @returns {void}
 */
router.delete('/dusuario/:id', desactivarUsuario, (req, res) => {
    res.json();
});

router.post('/ausuario/:id', activarUsuario, (req, res) => {
    res.json();
});


module.exports = router;