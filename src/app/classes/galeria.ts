export class GaleriaGlobal {
  constructor(
    public id: number,
    public body: string,
    public styles: string,    
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}

export class GaleriaContent {
  constructor(
    public id: number,
    public img: string,
    public status: string,
    public id_user: number,
    public id_global: number,
    public text_alternativo: string,
    public orden: number,
  ) {}
}

export class GaleriaImg {
  constructor(
    public id: number,
    public titulo: string,
    public alt_text: string,
    public url_imagen: string,
    public orden: number,
    public f_registro: string,
    public categoria_id: number,
  ) {}
}

export class GaleriaImgCategorias {
  constructor(
    public id: number,
    public nombre: string,
    public description: string,    
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}