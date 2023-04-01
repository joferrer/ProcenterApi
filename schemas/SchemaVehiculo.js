class Vehiculo {
    constructor(_vehiculo){
        this.id = _vehiculo.id
        this.marca = _vehiculo.marca
        this.modelo = _vehiculo.modelo
        this.anio   = _vehiculo.anio
        this.color = _vehiculo.color
        this.imagenes = _vehiculo.imagenes
        this.placa  = _vehiculo.placa
        this.otros = _vehiculo.otros
    }
}

module.exports = Vehiculo