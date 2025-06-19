export class ProductoLimite {
    constructor(
        public alto_max: number,
        public alto_min: number,
        public ancho_max: number,
        public ancho_min: number,
        public producto_id: number,
        public id?: number,
    ) { }

}
