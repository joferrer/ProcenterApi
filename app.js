require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {} = require('./app');
const path = require('path')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Procenter API REST",
      version: '1.0.0',
    }, 
  },
  apis: ["app.js"],

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));





//Global Variables
app.use((req, res, next) => {
  app.locals.db = req.db;
  next();
});

//routes
app.use(require('./routes/vehiculos'));
app.use(require('./routes/adquisiciones'));
app.use(require('./routes/venta'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/catalogo'));
app.use(require('./routes/autentificacion'));
//Vista para el back (temporal)

app.use(express.static(__dirname));

const history = require('connect-history-api-fallback');
app.use(history());
//Vista para el back (temporal)

/**
 * @swagger
 * /catalogo:
 *   get:
 *     summary: Consulta el catálogo de autos
 *     description: Obtiene el catálogo de autos disponibles
 *     tags:
 *       - catalogo
 *     responses:
 *       200:
 *         description: Datos del catálogo obtenidos correctamente
 *       500:
 *         description: Error al obtener el catálogo
 */

/**
 * @swagger
 * /desactivar-vehiculo/{id}:
 *   post:
 *     summary: Desactiva un vehículo
 *     description: Desactiva la disponibilidad de un vehículo específico
 *     tags:
 *       - catalogo
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del vehículo a desactivar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo desactivado correctamente
 *       400:
 *         description: Error al desactivar el vehículo
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /subir-imagen:
 *   post:
 *     summary: Sube una imagen a Amazon S3
 *     description: Sube una imagen a Amazon S3 y la asocia a un vehículo específico
 *     tags:
 *       - catalogo
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 *       400:
 *         description: No se proporcionó ninguna imagen
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error al subir la imagen a S3
 */





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server API running in http://localhost:${PORT}`);
})