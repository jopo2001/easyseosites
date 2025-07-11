export class FormGlobal {
  constructor(
    public id: number,
    public body: string,
    public styles: string,
    public f_registro: string, // o Date si lo manejas como objeto Date
    public titulo: string,
    public encabezado: string,
    public id_user: number    
  ) {}
}