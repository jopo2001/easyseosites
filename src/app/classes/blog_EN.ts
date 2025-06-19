export class BlogEN {
    constructor(
        public metaTwitter: string,
        public openGraph: string,
        public id_translate_ES: number,
        public altDef: string,
        public altEN: string,
        public altES: string,
        public canonical: string,
        public status: number,
        public robots: string,
        public fecha_registro: string,
        public body: string,
        public url: string,
        public resumen: string,
        public h1: string,
        public portada: string,
        public img: string,
        public recommendations: string,
        public description: string,
        public title: string,
        public id?: number,
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