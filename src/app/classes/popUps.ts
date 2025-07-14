export class PopUps {
  constructor(
    public id: number,
    public titulo: string,
    public body: string,
    public img: string,
    public posicion: string,
    public styles: string,
    public status: string,
    public id_user: number,
    public inicio_activo: string,
    public fin_activo: string,
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}