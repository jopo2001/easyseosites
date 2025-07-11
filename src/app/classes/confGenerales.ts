export class confHorarios {
  constructor(
    public id: number,
    public dias_atencion: string,
    public horario: string,
    public status: string,
    public id_user: number,
    public f_registro: string // o Date si lo manejas como objeto Date
  ) { }
}

export class confRrss {
  constructor(
    public id: number,
    public nombre: string,
    public icono_font_awesome: string,
    public status: string,
    public enlace: string,
    public id_user: number,
    public f_registro: string // o Date si lo manejas como objeto Date
  ) { }
}

export class ScriptsBody {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,
    public f_registro: string,
    public id_user: number,
    public description: string,
  ) { }
}

export class ScriptsHead {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,
    public f_registro: string,
    public id_user: number,
    public description: string,
  ) { }
}