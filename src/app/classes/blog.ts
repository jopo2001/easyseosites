export class BlogGlobal {
  constructor(
    public id: number,
    public body: string,
    public styles: string,    
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}

export class BlogContent {
  constructor(
    public id: number,
    public img: string,
    public titulo: string,
    public descripcion: string,
    public link: string,    
    public status: string,
    public id_user: number,
    public id_global: number,
    public id_page_es: number, 
  ) {}
}

export class BlogPost {
  constructor(
    public id: number,
    public meta_titulo: string,
    public meta_description: string, 
    public slug: string, 
    public resumen: string, 
    public body: string,    
    public img_card: string, 
    public img_portada: string,
    public autor: string,
    public f_publicacion: string,
    public f_actualizacion: string,
    public estado: string,
    public id_categoria: number,
    public canonical: string,
    public idioma: string,
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}

export class BlogCategorias {
  constructor(
    public id: number,
    public nombre: string,
    public slug: string,
    public description: string,    
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}