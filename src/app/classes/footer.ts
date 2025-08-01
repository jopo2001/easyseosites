export class FooterGlobal {
  constructor(
    public id: number,
    public body: string,
    public styles: string,
    public logo: string,
    public columnas_permitidas: number,
    public status: string,
    public desc_empresa: string,
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}

export class FooterEncabezados {
  constructor(    
    public id: number,
    public nombre: string,
    public status: string,
    public f_registro: string,
    public id_user: number,
    public orden: number,
  ) {}
}

export class FooterEnlaces {
  constructor(
    public id: number,    
    public nombre: string,
    public enlace: string,
    public status: string,    
    public id_user: number,
    public id_column_encabezado: number,
    public orden: number,
    public encabezado: string, // as de la columna nombre de la tabla encabezados
    public f_registro: string,
  ) {}
}

export class FooterLegal {
  constructor(
    public id: number,    
    public titulo: string,
    public enlace: string,
    public status: string,    
    public id_user: number,
    public f_registro: string,
    public orden: number,    
  ) {}
}