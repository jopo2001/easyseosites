export class Producto {
    constructor(
        public f_registro: string,
        public status: string,
        public min_metro_cuadrado: number,
        public costo_motor: number,
        public motor: string,
        public color_default: string,
        public nombre: string,
        public tipo: string,
        public id?: number,
    ) { }
}
