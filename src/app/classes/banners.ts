export class bannerImg {
  constructor(
    public id: number,
    public banners_id: number,
    public img: string,
    public orden: number,
    public status: number,    
  ) { }
}

export class banner {
  constructor(
    public id: number,
    public banner_type: string,
    public video: string,
    public poster: string,
    public titulo: string,
    public id_user: number,
    public f_registro: string,
    public descripcion: string,
    public display_mode: string,
    public id_contenido_fk: number,
  ) { }
}