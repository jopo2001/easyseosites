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
