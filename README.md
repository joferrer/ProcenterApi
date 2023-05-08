<h1 align="center">PROCENTER API<img src="https://miro.medium.com/v2/resize:fit:440/1*rupjWSREpJTCXrVjps9hWQ.png" alt="API REST" style="width: 150px; height: 44px;" width="150" height="44" /></a></h1>

<div align="center">
<img src="https://img.shields.io/badge/DB-Firebase-FFCA28?logo=Firebase&logoColor=FFCA28" alt="Firebase"/>
<img src="https://img.shields.io/badge/USO-Node.js-339933?logo=Node.js&logoColor=339933" alt="Node.js"/>
<img src="https://img.shields.io/badge/Autor-ECOTECH-000000?logo=Visual+Studio+Code&logoColor=007ACC" alt="Ecotech"/>
<img src="https://img.shields.io/badge/Repositorio-Back_End-000000?logo=GitHub&logoColor=181717" alt="Back End"/>
</div>
<div>
<img src="https://www.appleute.de/wp-content/uploads/2021/05/api-removebg-preview-min.png" align="right" style="width: 80px; height: 80px;" />
</div>


## ¿Que es Procenter API?
Procenter API es una API REST desarrollado con la finalidad de abstraer contenido del catálogo de WhatsApp Business de la empresa Procenter Autos, utilizando tecnologías como Firebase Y Node.JS, enviamos petición al catálogo de  vehículos con la finalidad de obtener información del catálogo en tiempo real.

Este proyecto es la capa de Back End del proyecto ProcenterAutos web, que ofrece el envio/recepcion de datos hacia la capa de front end, a continuacion encontraras una tabla de contenido orientado a la instalacion y uso del producto software.
## Lista de Contenido
- [Instalacion](#instalacion)
- [Uso](#uso)
- [Autores](#autores)
- [Licencia](#licencia)

## instalacion

Para ejecutar nuestro proyecto debes tener instalado [NodeJS con NPM](https://nodejs.org/es/download) y [Git, Sistema de control de versiones](https://git-scm.com/)el primer paso es clonar el repositorio usando una ** ventana de comando de Git ** donde aplicaremos la siguiente linea de comando para elaborar una copia local del repositorio del proyecto:
</br>
<code>git clone https://github.com/joferrer/ProcenterApi.git</code>

Luego, nos vamos a la carpeta donde clonamos el repositorio, abrimos el proyecto en Visual Studio Code y tipeamos la instalacion de los modulos esenciales de NodeJS del proyecto, simplemente desde la terminal de VSCode aplicamos la siguiente linea:
</br>
<code>npm i</code>
> Recuerda que para que nuestro proyecto se ejecute normalmente, debes tener instalado el [Framework de Node.js](https://nodejs.org/es)
## uso
Actualmente abres una ** instancia de la consola de comando  y ejecutas la siguiente linea de codigo:
</br>
<code>npm run dev</code>
### Rutas del proyecto
Puedes ver todas las peticiones https desde nuestra [API REST Documentacion con Swagger(https://nodejs.org/es/download) para mayor detalle, a continuacion se hablara de cada una de las peticiones catalogadas en los diferentes modulo del sistema
#### Usuarios
##### Crear un nuevo
Enviaremos una peticion de tipo POST para insertar un nuevo usuario en la base de datos, para ello en el cuerpo de la peticion, necesitamos recibir los siguientes parametros:
| **Nombre** | **Tipo de Dato** |                      **Descripcion**                     |
|:----------:|:----------------:|:--------------------------------------------------------:|
|   Nombre   |      String      |                Nombre completo del usuario               |
|   Correo   |       Email      |              Correo Electronico del Usuario              |
|   Imagen   |      String      |                  Url de icono de perfil                  |
|  Telefono  |      Number      |             Un numero de contacto del usuario            |
|     Rol    |      String      | Un rol que juega el usuario como Asesor, Admin o Cliente |

**URL**: https:localhost:4000/cusuario, method: **POST**
> Se aconseja herramienta para elaborar peticiones http, algunas herramientas que recomendamos son [*POSTMAN*](https://www.postman.com/), 
[*Thunder Client for Visual Studio Code*](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client), entre otras


### autores


### licencia

