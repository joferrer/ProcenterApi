class Vehiculo {
    constructor(_vehiculo){
        this.id = _vehiculo.id;
        this.marca = _vehiculo.marca;
        this.modelo = _vehiculo.modelo;
        this.anio   = _vehiculo.anio;
        this.motor = _vehiculo.motor;
        this.color = _vehiculo.color; 
        this.rin = _vehiculo.rin;
        this.imagenes = _vehiculo.imagenes;
        this.placa  = _vehiculo.placa;
        this.otros = _vehiculo.otros;
        this.precio = _vehiculo.precio;
    }
}

module.exports = Vehiculo