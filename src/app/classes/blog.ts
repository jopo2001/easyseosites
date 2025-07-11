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