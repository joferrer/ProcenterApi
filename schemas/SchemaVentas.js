class Venta {
    constructor(_id, _pago, _comprador, _estado){
        this.id = id;
        this.pago = pago;
        this.comprador = comprador
        this.estado = estado
    }
}
class Pago {
    constructor(_pago){
        this.dinero = _pago.dinero;
        this.vehiculos = _pago.vehiculos;
        this.comprado = _pago.comprador;
       
    }
}
class Comprador {
    constructor(_comprador){
        this.cedula = _comprador.cedula;
        this.nombre = _comprador.nombre;
        this.telefono = _comprador.telefono;
        this.correo = _comprador.correo;
    }
}
class Estado {
    constructor(_estado){
        this.validador = _estado.validador;
        this.descripcion = _estado.descripcion
    }
}


module.exports = {Venta, Pago, Comprador, Estado}; 