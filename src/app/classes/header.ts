export class HeaderGlobal {
  constructor(
    public id: number,
    public body: string,
    public styles: string,
    public logo: string,
    public traductor: boolean,
    public items_permitidos: number,
    public status: string,
    public f_registro: string // o Date si lo manejas como objeto Date
  ) {}
}

export class HeaderMenu {
  constructor(
    public id: number,
    public status: string,
    public url: string,
    public nombre: string,
    public id_user_cambio: number,
    public f_registro: string, // o Date
    public orden: number,
    public subnivel: number
  ) {}
}

export class HeaderSubmenu {
  constructor(
    public id: number,
    public status: string,
    public url: string,
    public nombre: string,
    public id_user_cambio: number,
    public f_registro: string, // o Date
    public orden: number,
    public id_header_menu: number
  ) {}
}
