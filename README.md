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
- [Rutas del Proyecto](#rutas)
- [Autores](#autores)

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
> Por defecto, arranca en el proyecto localhost:4000
### rutas
Puedes ver todas las peticiones https desde nuestra [API REST Documentacion con Swagger](https://procenterapi-production.up.railway.app/api-docs/)  a continuacion se abarca cada uno de estos modulos:
#### catalogo
![Modulo de Catalogo](https://github.com/joferrer/ProcenterApi/assets/62295874/86bd1707-e31f-4f29-bd6f-0daa896c6672)
> Puedes accederlo desde https://procenterapi-production.up.railway.app/api-docs/#/Catalogo
#### usuario
![Modulo de Usuarios](https://github.com/joferrer/ProcenterApi/assets/62295874/9b4a7eb0-a299-4250-88e1-16f6b11e6736)
> Puedes accederlo desde https://procenterapi-production.up.railway.app/api-docs/#/Gestion%20de%20usuarios
#### ventas
![Modulo de Ventas](https://github.com/joferrer/ProcenterApi/assets/62295874/3cecd85f-676a-48cf-9b23-ddccc14b82f1)
> Puedes accederlo desde https://procenterapi-production.up.railway.app/api-docs/#/Registro%20de%20Ventas
#### adquisiciones
![Modulo de Adquisiciones](https://github.com/joferrer/ProcenterApi/assets/62295874/d5aeef20-f52c-4ad1-8dc1-25935a51e43b)
> Puedes accederlo desde https://procenterapi-production.up.railway.app/api-docs/#/Adquisiciones
### autores
> Gracias al desarrollo de Marlon Stiven Prado, Walfram Tiria y Andres Camperos

