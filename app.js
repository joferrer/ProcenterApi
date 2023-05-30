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
 *       - Catalogo
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
 *       - Catalogo
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
 *       - Catalogo
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


/**
 * @swagger
 * 
 * 
 * 
 * 
 * /crear-usuario:
 *   post:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Agrega un usuario en el sistema
 *     description: a a traves de su ID como parametro en la busqueda
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Datos del usuario para agregar
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             correo:
 *               type: string
 *               format: email
 *             imagen:
 *               type: string
 *               format: uri   
 *             telefono:
 *               type: string
 *             cedula:
 *               type: integer
 *             rol:
 *               type: string
 *               enum:
 *                 - ASESOR
 *                 - CLIENTE
 *                 - ADMIN
 *                 - PUBLIC
 *           example:
 *               nombre: "Jairo Caicedo"
 *               correo: "juansebastian@gmail.com"
 *               imagen: "https://cdn.onemars.net/sites/nutro_es_NkyIN_B9cV/image/20_1615903469720.jpeg"   
 *               telefono: "+573115609183"
 *               cedula: 3115609183
 *               rol: "CLIENTE" 
 *     responses:
 *       200:
 *         description: Usuario agregado correctamente
 *       400:
 *         description: Error al insertar el usuario, revisa la informacion que enviaste en el formulario
 *        
 * 
 * /usuarios:
 *   
 *  
 *   get:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Consultar todos los usuarios
 *     description: Consulta todos los usuarios del Sistema, retornando un JSON de todos los usuarios del sistema
 *     responses:
 *       200:
 *         description: ¡Lista de usuario cargado con exito!
 *       400:
 *         description: No hay usuarios registrados en la base de datos

 * /usuario/{id}:
 *   get:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Consulta un usuario en el sistema
 *     description: Consulta la existencia de un usuario del sistema a traves de su ID como parametro en la busqueda
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: ¡Usuario consultado con exito!
 *       400:
 *         description: El usuario no existe
 *   
 * 
 * /uusuario/{id}:
 *   put:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Actualiza un usuario en el sistema
 *     description: Actualiza un usuario por medio de su campo ID
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Cuerpo de informacion de la DATA que el usuario se deba actualizar
 *   
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             correo:
 *               type: string
 *               format: email
 *             imagen:
 *               type: string
 *               format: uri   
 *             telefono:
 *               type: string
 *             cedula:
 *               type: integer
 *             rol:
 *               type: string
 *               enum:
 *                 - ASESOR
 *                 - CLIENTE
 *                 - ADMIN
 *                 - PUBLIC
 *           example:
 *               nombre: "Jairo Caicedo"
 *               correo: "juansebastian@gmail.com"
 *               imagen: "https://cdn.onemars.net/sites/nutro_es_NkyIN_B9cV/image/20_1615903469720.jpeg"   
 *               telefono: 3115609183
 *               rol: "CLIENTE" 
 *               cedula: 28986472
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error al actualizar el usuario, revisa la informacion que enviaste en el formulario
 * 
 *
 *
 * 
 * 
 * /dusuario/{id}:
 *   delete:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Desactivar un usuario en el sistema
 *     description: Desactiva un usuario a traves de su ID como parametro en la URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: ¡Usuario desactivado con exito!
 *       400:
 *         description: El usuario no existe  
 * 
 * /ausuario/{id}:
 *   post:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Activa un usuario en el sistema
 *     description: Activa un usuario a traves de su ID como parametro en la URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: ¡Usuario activado con exito!
 *       400:
 *         description: El usuario no existe  
 *        
 */


/**
 * @swagger
 * /crear-venta:
 *   post:
 *     tags:
 *     - Registro de Ventas
 *     summary: Crea una venta
 *     description: Crea una nueva venta en el sistema
 *     parameters:
 *       - in: body
 *         name: venta
 *         required: true
 *         description: Elaborar un registro de venta
 *         schema:
 *           type: object
 *           properties:
 *             idvehiculo:
 *               type: string
 *               pattern: "^[a-zA-Z0-9]{20}$"      
 *             cliente:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   minLength: 3
 *                   maxLength: 40
 *                   pattern: "^[a-zA-Z ]+$"
 *                 cedula:
 *                   type: number
 *                   minimum: 1000000
 *                   maximum: 99999999999
 *                 correo:
 *                   type: string
 *                   format: email
 *                   maxLength: 254
 *                 telefono:
 *                   type: string
 *               required:
 *                 - nombre
 *                 - cedula
 *                 - correo
 *                 - telefono
 *             idasesor:
 *               type: string
 *               pattern: "^[a-zA-Z0-9]{20}$"
 *           example:
 *               idvehiculo: "ABC123456789"
 *               cliente:
 *                 nombre: "Jairo Caicedo"
 *                 cedula: 28986472
 *                 correo: "juansebastian@gmail.com"
 *                 telefono: "+573115609183"
 *               idasesor: "ABC123456789"
 *     responses:
 *       200:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Error al crear la venta, revisa los datos enviados
 *  
 * /rventa:
 *   get:
 *     tags:
 *     - Registro de Ventas
 *     summary: Obtener todas las ventas
 *     description: Obtiene todas las ventas registradas en el sistema
 *     responses:
 *       200:
 *         description: Lista de ventas consultada con exito
 *       400:
 *         description: No se encontraron ventas registradas
 * 
 * /rventabyid/{id}:
 *   get:
 *     tags:
 *     - Registro de Ventas
 *     summary: Obtener una venta por ID
 *     description: Obtiene una venta específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la venta a obtener
 *     responses:
 *       200:
 *         description: Consulta de Venta de manera exitosa
 *       400:
 *         description: No se encontraron ventas para el ID del asesor
 */


/**
 * @swagger
 * /agregar-adquisicion:
 *   post:
 *     tags:
 *     - Adquisiciones
 *     summary: Agregar adquisición
 *     description: Agrega una nueva adquisición al sistema
 *     parameters:
 *       - in: body
 *         name: adquisicion
 *         required: true
 *         description: Elaborar un registro de adquisición
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             nombre:
 *               type: string
 *               pattern: ^[\w\s]+$
 *               minLength: 1
 *               maxLength: 255
 *             marca:
 *               type: string
 *               pattern: ^[a-zA-Z0-9\-]+$
 *               minLength: 1
 *               maxLength: 255
 *             modelo:
 *               type: string
 *               pattern: ^[\w\s]+$
 *               minLength: 1
 *               maxLength: 255
 *             color:
 *               type: string
 *               pattern: ^[^\d\s]+$
 *               minLength: 1
 *               maxLength: 255
 *             motor:
 *               type: string
 *               pattern: ^[a-zA-Z0-9]+$
 *               minLength: 1
 *               maxLength: 255
 *             placa:
 *               type: string
 *               pattern: ^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z])$
 *               minLength: 1
 *               maxLength: 255
 *             anio:
 *               type: integer
 *               minimum: 1
 *               maximum: 9999
 *             precioDueno:
 *               type: number
 *               minimum: 0
 *               maximum: 999999999999
 *             soat:
 *               type: boolean
 *             cedula:
 *               type: number
 *               minimum: 1000000
 *               maximum: 99999999999
 *             nombredueno:
 *               type: string
 *               pattern: ^[^\d\s]+$
 *               minLength: 1
 *               maxLength: 255
 *             prenda:
 *               type: string
 *               minLength: 1
 *               maxLength: 255
 *             correo:
 *               type: string
 *               format: email
 *               minLength: 1
 *               maxLength: 254
 *             telefono:
 *               type: string
 *             impuestos:
 *               type: boolean
 *             detalles:
 *               type: string
 *               maxLength: 255
 *             estado:
 *               type: boolean
 *             idpublic:
 *               type: string
 *               pattern: ^[a-zA-Z0-9]{20}$
 *               minLength: 1
 *               maxLength: 255
 *           required:
 *             - nombre
 *             - marca
 *             - modelo
 *             - color
 *             - motor
 *             - placa
 *             - anio
 *             - precioDueno
 *             - fechaMatricula
 *             - soat
 *             - cedula
 *             - nombredueno
 *             - prenda
 *             - correo
 *             - telefono
 *             - impuestos
 *             - detalles
 *             - idpublic
 *           example:
 *             nombre: "MAZDA 3 2021"
 *             marca: "Mercedez-benzs"
 *             modelo: "3"
 *             color: "Green"
 *             motor: "V8"
 *             placa: "UED359"
 *             anio: 2023
 *             precioDueno: 30550000
 *             fechaMatricula: "01/12/2020"
 *             soat: true
 *             prenda: "OLX"
 *             impuestos: true
 *             detalles: "NINGUNO"
 *             nombredueno: "Camilo"
 *             telefono: "+573135702122"
 *             cedula: 1151914
 *             correo: "alrighddt@gmail.com"
 *             idpublic: "DoAyh117nT9PYG8GC7R2"    
 *     additionalProperties: false
 *     responses:
 *       200:
 *         description: Adquisicion ag  regada correctamente
 *       400:
 *         description: Error al agregar la adquisicion, revisa los datos enviados
 *
 *
 * /adquisiciones:
 *   get:
 *     tags:
 *     - Adquisiciones
 *     summary: Obtener todas las adquisiciones del Publicista
 *     description: Obtiene todas las adquisiciones registradas en el sistema
 *     responses:
 *       200:
 *         description: Lista de adquisiciones consultada con exito
 *       400:
 *         description: No se encontraron adquisiciones registradas
 * 
 * /adquisicion/{id}:
 *   get:
 *     tags:
 *     - Adquisiciones
 *     summary: Obtener una adquisicion por ID
 *     description: Obtiene una adquisicion específica por su ID de Publicista
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la adquiscion a obtener
 *     responses:
 *       200:
 *         description: Consulta de adquisicion de manera exitosa
 *       400:
 *         description: No se encontraron adquisiciones para el ID del publicista
 * /desactivar-adquisicion/{id}:
 *   post:
 *     tags:
 *     - Adquisiciones
 *     summary: desactiva una adquisicion por ID
 *     description: desactiva una adquisicion específica por su ID de adquisicion
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la adquiscion a obtener
 *     responses:
 *       200:
 *         description:  se ha deshabilitado correctamente 
 *       400:
 *         description: No se ha encontrado la adquisicion
 */



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server API running in http://localhost:${PORT}`);
})