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

/**
 * @swagger
 * 
 * 
 * 
 * 
 * /cusuario:
 *   post:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Agrega un usuario en el sistema
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
 *     responses:
 *       200:
 *         description: Usuario agregado correctamente
 *       400:
 *         description: Error al insertar el usuario, revisa la informacion que enviaste en el formulario
 *        
 * 
 * /rusuario:
 *   
 *  
 *   get:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Consultar todos los usuarios
 *     description: Consulta todos los usuarios del Sistema, retornando un JSON de todos los usuarios del sistema
 *     responses:
 *       200:
 *         description: Lista de usuarios cargados en el sistema
 *       400:
 *         description: Error al cargar usuario en la plataforma

 * /rusuariobyid/{id}:
 *   get:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Consulta un usuario en el sistema
 *     description: Consulta la existencia de un usuario del sistema a traves de su ID como parametro en la busqueda
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: Consulta de usuario de manera exitosa
 *       400:
 *         description: Error usuario inexistente en la base de datos
 *   
 * 
 * /uusuario/{id}:
 *   put:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Actualiza un usuario en el sistema
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
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Consulta un usuario en el sistema
 *     description: Elimina un usuario a traves de su ID como parametro en la URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: Eliminacion de usuario de manera exitosa
 *       400:
 *         description: Error usuario inexistente en la base de datos  
 *        
 */

/**
 * /cusuario:
 *   post:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Agrega un usuario en el sistema
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
 *     responses:
 *       200:
 *         description: Usuario agregado correctamente
 *       400:
 *         description: Error al insertar el usuario, revisa la informacion que enviaste en el formulario
 *        
 * 
 * /rvehiculos:
 *   
 *  
 *   get:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Consultar todos los usuarios
 *     description: Consulta todos los usuarios del Sistema, retornando un JSON de todos los usuarios del sistema
 *     responses:
 *       200:
 *         description: Lista de usuarios cargados en el sistema
 *       400:
 *         description: Error al cargar usuario en la plataforma

 * /rusuariobyid/{id}:
 *   get:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Consulta un usuario en el sistema
 *     description: Consulta la existencia de un usuario del sistema a traves de su ID como parametro en la busqueda
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: Consulta de usuario de manera exitosa
 *       400:
 *         description: Error usuario inexistente en la base de datos
 *   
 * 
 * /uusuario/{id}:
 *   put:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Actualiza un usuario en el sistema
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
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
 *     sumary: Consulta un usuario en el sistema
 *     description: Elimina un usuario a traves de su ID como parametro en la URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del Usuario
 *     responses:
 *       200:
 *         description: Eliminacion de usuario de manera exitosa
 *       400:
 *         description: Error usuario inexistente en la base de datos  
 *        
 */




//Global Variables
app.use((req, res, next) => {
  app.locals.db = req.db;
  next();
});

//routes
app.use(require('./routes/vehiculos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/catalogo'));

//Vista para el back (temporal)

app.use(express.static(__dirname));

const history = require('connect-history-api-fallback');
app.use(history());
//Vista para el back (temporal)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en localhost:${PORT}`);
})