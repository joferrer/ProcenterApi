class Usuario{
    constructor(_usuario){
        this.id = _usuario.id;
        this.nombre = _usuario.nombre;
        this.correo = _usuario.correo;
        this.imagen = _usuario.imagen;
        this.telefono = _usuario.telefono;
        this.rol = _usuario.rol;
    }
}

module.exports = Usuario;
