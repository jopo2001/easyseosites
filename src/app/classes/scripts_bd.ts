export class scripts_bd_body {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,        
    public f_registro: string, // o Date si lo manejas como objeto Date
    public id_user: number
  ) {}
}

export class scripts_bd_head {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,        
    public f_registro: string, // o Date si lo manejas como objeto Date
    public id_user: number
  ) {}
}

export class script_medicion {
  constructor(
    public id: number,
    public nombre: string,
    public id_medicion: number,        
    public f_registro: string, // o Date si lo manejas como objeto Date
    public id_user: number
  ) {}
}