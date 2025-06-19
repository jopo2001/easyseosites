export class User {
    constructor(
        public fecha_registro: string,
        public imagen:string,
        public telefono: string,
        public puesto: string,
        public apellidos: string,
        public nombres: string,
        public password: string,
        public correo: string,
        public id_user?: number,
    ) { }

}
/*
tome fecha sin la hora:
public fecha_alta: Date;

constructor(
    // Otros parámetros...
    fecha_alta: Date,
    // Otros parámetros...
) {
    this.fecha_alta = new Date(fecha_alta.toDateString()); // Conserva solo la fecha, sin la hora
}

*/