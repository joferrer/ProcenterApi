
const{ probando } = require('../../firebase/provider');
const Vehiculo = require('../../schemas/SchemaVehiculo');

//Probando los schemas 
const funcionPrueba = () =>{
    console.log('Prueba...\n');
    probando();

    const nuevoVehiculo = new Vehiculo({
        nombre: 'CHEVROLET TRACKER LTZ 1.2 TURBO AUTOMATICA MOD 2022 CON 21MIL KMS',
        placa: 'VAV303',
        anio: 2022,
        modelo: 'TRACKER'
    })


    console.log(`Vehiculo: \n ${JSON.stringify(nuevoVehiculo)} `)
}

module.exports = {
    funcionPrueba
}
