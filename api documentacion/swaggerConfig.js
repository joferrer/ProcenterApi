const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Otras importaciones y configuraciones de Swagger...

// Configuración de opciones de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Procenter API REST",
      version: '1.0.0',
    },
  },
  apis: ["app.js"],
};

// Generar la documentación de Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
/**
 * @swagger
 * 
 * 
 * 
 * 
 * /crearUsuario:
 *   post:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de usuarios
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
 *     summary: Consultar todos los usuarios
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
 *     summary: Consulta un usuario en el sistema
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
 *     summary: Consulta un usuario en el sistema
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
 * @swagger
 * /cvehiculos:
 *   post:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de vehiculos
 *     summary: Agrega un vehiculo en el sistema
 *     description: Crea un vehiculo en la coleccion Vehiculos en la base de datos
 *     parameters:
 *       - in: body
 *         name: vehiculo
 *         required: true
 *         description: Camppos de vehiculos obligatorios para agregar
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             modelo:
 *               type: string
 *             anio:
 *               type: integer
 *             motor:
 *               type: string
 *             color:
 *               type: string
 *             rin:
 *               type: string
 *             imagenes:
 *               type: object
 *             placa:
 *               type: string
 *             otros:
 *               type: string
 *             precio:
 *               type: integer  
 *           example:
 *               marca: "Toyota"
 *               modelo: "Hilux"
 *               anio: 2021
 *               motor: "MOTOR 8 caballos" 
 *               color: "Negro" 
 *               rin: "18 rin"
 *               imagenes: { url1: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png", url2: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png", url3: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png"  }
 *               placa: "KFG359"   
 *               otros: "3105708967"
 *               precio: 130000000 
 *     responses:
 *       200:
 *         description: Vehiculo agregado correctamente
 *       400:
 *         description: Error al insertar el vehiculo, revisa la informacion que enviaste en el formulario
 *        
 * 
 * /rvehiculos:
 *   
 *  
 *   get:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de vehiculos
 *     summary: Consultar todos los vehiculos del sistema
 *     description: Consulta todos los vehiculos en la coleccion "Vehiculos" en la base de datos
 *     responses:
 *       200:
 *         description: Lista de vehiculos cargados en el sistema
 *       400:
 *         description: Error al cargar vehiculo en la plataforma
 *
 * /rvehiculosbyid/{id}:
 *   get:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de vehiculos
 *     summary: Consultar un vehiculo en el sistema
 *     description: Consulta un vehiculo del sistema a traves de su ID del documento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del vehiculo
 *     responses:
 *       200:
 *         description: Consulta de vehiculo de manera exitosa
 *       400:
 *         description: Error vehiculo inexistente en la base de datos
 *   
 * 
 * /uvehiculos/{id}:
 *   put:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de vehiculos
 *     summary: Actualiza un vehiculo del sistema
 *     description: Actualiza un vehiculo en la base de datos usando la ID de su documetno
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del vehiculo
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
 *               marca: "Toyota"
 *               modelo: "Hilux"
 *               anio: 2021
 *               motor: "MOTOR 8 caballos" 
 *               color: "Negro" 
 *               rin: "18 rin"
 *               imagenes: { url1: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png", url2: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png", url3: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png"  }
 *               placa: "KFG359"   
 *               otros: "3105708967"
 *               precio: 130000000 
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del vehiculo
 *     responses:
 *       200:
 *         description: vehiculo actualizado correctamente
 *       400:
 *         description: Error al actualizar el vehiculo, revisa la informacion que enviaste en el formulario
 * 
 * /dvehiculos/{id}:
 *   delete:
 *     tags:
 *     - Consulta, Creacion,Ediccion y Eliminacion de vehiculos
 *     summary: Eliminar un un vehiculo del sistema
 *     description: Elimina un vehiculo de la coleccion "vehiculos" por medio de su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del vehiculo
 *     responses:
 *       200:
 *         description: Eliminacion de vehiculo de manera exitosa
 *       400:
 *         description: Error vehiculo inexistente en la base de datos         
 */



// Exportar la documentación de Swagger
module.exports = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(swaggerDocs)
};
