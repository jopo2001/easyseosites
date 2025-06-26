import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../servicios/admin.service';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit {
  imagenes: any[] = [];
  cargando: boolean = false;
  error: string = '';
  public imagenSeleccionada: any = null;


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.cargarImagenes();
  }

  cargarImagenes() {
    this.cargando = true;
    this.adminService.getGaleriaImagenes().subscribe({
      next: (data) => {
        this.imagenes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar imágenes', err);
        this.error = 'Error al cargar imágenes';
        this.cargando = false;
      }
    });
  }

  abrirImagen(img: any) {
    this.imagenSeleccionada = img;
  }

  cerrarImagen() {
    this.imagenSeleccionada = null;
  }

  copiarUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copiada al portapapeles');
    }, () => {
      alert('Error al copiar');
    });
  }
}
