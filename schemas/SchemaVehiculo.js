
class Vehiculo {

    constructor(jsonVehiculo){
        this.nombre = jsonVehiculo.nombre
        this.placa  = jsonVehiculo.placa
        this.anio   = jsonVehiculo.anio
        this.modelo = jsonVehiculo.modelo
    }
}

module.exports = Vehiculo