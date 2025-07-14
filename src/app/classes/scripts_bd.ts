export class ScriptsBody {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,        
    public f_registro: string, // o Date si lo manejas como objeto Date
    public id_user: number,
    public description: string,
    public prioridad: number
  ) {}
}

export class ScriptsHead {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,        
    public f_registro: string, // o Date si lo manejas como objeto Date    
    public description: string,    
    public id_user: number,
    public prioridad: number
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