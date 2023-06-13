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
app.use(require('./routes/resenia')); 
//routes
app.use(require('./routes/vehiculos'));
app.use(require('./routes/adquisiciones'));
app.use(require('./routes/venta'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/catalogo')); 
app.use(require('./routes/autentificacion'));
//Vista para el back (temporal)
app.use(require('./routes/infoempresarial'));
app.use(express.static(__dirname));
 //
const history = require('connect-history-api-fallback');
app.use(history());



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server API running in http://localhost:${PORT}`);
})

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
 *       400:
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
 *           type: number
 *     responses:
 *       200:
 *         description: Vehículo desactivado correctamente
 *       400:
 *         description: Error al desactivar el vehículo
 *       404:
 *         description: Vehículo no encontrado
 *
* @swagger
 * /catalogoEcommerce:
 *   get:
 *     summary: Obtener vehiculos  de 5 vehiculos de catalogo
 *     description: Obtiene 5  vehiculos de catalogo de  FireStoreDatabase
 *     tags:
 *       - Catalogo
 *     responses:
 *       200:
 *         description: Retorna la lista de catalogo
 *       400:
 *         description: Error al obtener vehiculos
 *
 * /actualizarPlaca:
 *   post:
 *     summary: Agregar la placa de un vehiculo
 *     description: Agrega o actualiza la placa de un vehiculo existente
 *     tags:
 *       - Catalogo
 *     parameters:
 *       - in: body
 *         name: id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idvehiculo:
 *               type: number
 *             placa:
 *               type: string
 *           example:
 *               idvehiculo: 4906346732823173
 *               placa: KFG359
 *     responses:
 *       200:
 *         description: Placa de vehiculo agregado o actualizado correctamente
 *       400:
 *         description: Error al insertar la placa de vehiculo
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
 *       405:
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
 *     description: Inserta un nuevo usuario al sistema
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: El usuario debe enviar obligatoriamente los siguiente parametros=  nombre, correo, telefono, cedula, rol
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
 * /actualizar-usuario/{id}:
 *   put:
 *     tags:
 *     - Gestion de usuarios
 *     summary: Actualiza un usuario en el sistema
 *     description: Actualiza un usuario por medio de su campo ID
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: El usuario debe enviar obligatoriamente los siguiente parametros=  nombre, correo, telefono, cedula, rol
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             correo:
 *               type: string
 *               format: email
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
 *               telefono: "+573115609183"
 *               cedula: 28986472
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
 * /desactivar-usuario/{id}:
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
 * /activar-usuario/{id}:
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
 *               type: number
 *             cliente:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 cedula:
 *                   type: number
 *                 correo:
 *                   type: string
 *                   format: email
 *                   maxLength: 254
 *                 telefono:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *               required:
 *                 - nombre
 *                 - cedula
 *                 - correo
 *                 - telefono
 *                 - precio
 *                 - descripcion
 *             idasesor:
 *               type: string
 *           example:
 *               idvehiculo: 6697431286937898
 *               descripcion: "Pago de contado en efectivo"
 *               precio: 50000000
 *               cliente:
 *                 nombre: "Jairo Caicedo"
 *                 cedula: 28986472
 *                 correo: "juansebastian@gmail.com"
 *                 telefono: "+573115609183"
 *               idasesor: "gT2mNEjVbaTUg2GxngLL"
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
 *             marca:
 *               type: string
 *             modelo:
 *               type: string
 *             color:
 *               type: string
 *             motor:
 *               type: string
 *             placa:
 *               type: string
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
 *             fechaMatricula:
 *               type: string
 *               maxLength: 255
 *             estado:
 *               type: boolean
 *             idpublic:
 *               type: string
 *               
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

/**
 * @swagger
 * /agregar-vehiculo:
 *   post:
 *     tags:
 *     - Vehiculos
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
 *               kilometraje: 23
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
 * /vehiculos:
 *   
 *  
 *   get:
 *     tags:
 *     - Vehiculos
 *     summary: Consultar todos los vehiculos del sistema
 *     description: Consulta todos los vehiculos en la coleccion "Vehiculos" en la base de datos
 *     responses:
 *       200:
 *         description: Lista de vehiculos cargados en el sistema
 *       400:
 *         description: Error al cargar vehiculo en la plataforma
 *
 * /vehiculo/{id}:
 *   get:
 *     tags:
 *     - Vehiculos
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
 * /vehiculo-actualizar/{id}:
 *   put:
 *     tags:
 *     - Vehiculos
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
 * /vehiculo-eliminar/{id}:
 *   delete:
 *     tags:
 *     - Vehiculos
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

/**
 * @swagger
 * /info-empresa:
 *   get:
 *     summary: Consulta la informacion de la empresa
 *     description: Obtiene la mision, vision y quienes somos en la empresa
 *     tags:
 *       - Informacion Empresarial
 *     responses:
 *       200:
 *         description: Informacion empresarial cargado con exito
 *       400:
 *         description: Error al obtener la informacion empresarial
 */

/**
 *  @swagger
 * /actualizar-info-empresa:
 *   put:
 *     tags:
 *       - Informacion Empresarial
 *     summary: Actualiza la informacion de la empresa
 *     description: Actualiza la mision, vision y quienes somos en la empresa
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Campo de informacion empresarial
 *         schema:
 *           type: object
 *           properties:
 *             mision:
 *               type: string
 *             vision:
 *               type: string
 *             quienesSomos:
 *               type: string
 *           example:
 *               mision: "Vendemos y compramos vehiculos en cucuta"
 *               vision: "Nuestra vision es ser la empresa lider en el mercado de vehiculos ofreciendo un servicio de calidad y confianza"
 *               quienesSomos: "Somos una empresa dedicados a la venta de vehiculos con el fin de satisfacer las necesidades de nuestros clientes ofreciendo un servicio de calidad y confianza"
 *     responses:
 *       200:
 *         description: ¡Informacion actualizada con exito!
 *       400:
 *         description: Error Info Empresarial no existe
 * 
 */


/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Consulta las reseñas de los clientes
 *     description: Obtiene la reseña con el nombre del cliente y sus comentarios del vehiculo
 *     tags:
 *       - Resenia
 *     responses:
 *       200:
 *         description: ¡Lista de reseñas cargado con exito!
 *       400:
 *         description: Error al obtener las resenias de los clientes
 */

/**
 *  @swagger
 * /agregarResena:
 *   post:
 *     tags:
 *       - Resenia
 *     summary: Agrega una reseña de un cliente en el sistema
 *     description: Agrega una reseña con nombre del cliente y sus comentarios del vehiculo
 *     parameters:
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Campo del reseña
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             comentarios:
 *               type: string
 *           example:
 *               nombre: "Pablo Camilo"
 *               comentarios: "Excelente vehiculo 5 estrellas"
 *     responses:
 *       200:
 *         description: ¡Reseña agregada con exito!
 *       400:
 *         description: Error la resenia  no existe
 * /desactivarResena/{id}:
 *   delete:
 *     tags:
 *     - Resenia
 *     summary: Desactivar una resenia en el sistema
 *     description: Desactiva una resenia  a traves de su ID como parametro en la URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID del resena
 *     responses:
 *       200:
 *         description: Reseña desactivado con exito!
 *       400:
 *         description: La reseña no existe  
 * 
 * /activarResena/{id}:
 *   post:
 *     tags:
 *     - Resenia
 *     summary: Activa una resenia en el sistema
 *     description: Activa una resenia a traves de su ID como parametro en la URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campo de cadena de caracteres de la ID de la resenia
 *     responses:
 *       200:
 *         description: reseña activado con exito!
 *       400:
 *         description: La reseña no existe  
 *        
 *
 */
