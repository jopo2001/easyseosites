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