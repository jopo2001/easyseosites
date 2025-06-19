import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Blog } from '../../classes/blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { domain } from '../../classes/globals';


@Component({
  selector: 'app-lista-blogs',
  templateUrl: './lista-blogs.component.html',
  styleUrl: './lista-blogs.component.css'
})
export class ListaBlogsComponent implements OnInit {
  public domain = domain;
  mostrarFormulario: boolean = false; //Variable para mostrar formulario: 

  @ViewChild('fileUpload3') fileUploadInput3!: ElementRef;


  blogModel = new Blog("","",0,"","","","",0,"","", "", "", "", "", "", "", "", "", "", 0);
  blogs: Blog[] = [];
  banderaAdd = 0;
  contador = 1;
  opcionStatus: any[] = [
  ];

  filtro: string = '';
blogsOriginal: Blog[] = [];


  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
    private router: Router
  ) { }


  ngOnInit() {
    this.obtenerBlogs();
  }

  /*
  obtenerSucursales(){
    return this.autosService.getSucursalesC(5).subscribe(data => { 
      this.sucursal = data;
    
    
    });
  
  /*Obtener sucursales con filtros */

  stringToNumber(status: string | number): number {
    return Number(status);
  }

  obtenerBlogs() { //Consultas para no depender del PHP
    this.adminService.getBlogs(1).subscribe(
      (blogsG: Blog[]) => {
        this.blogs = blogsG;
            this.blogsOriginal = blogsG;

        console.log('Tipo data: ', this.blogs)
      }

    );
  }

filtrarBlogs() {
  if (this.filtro.trim() === '') {
    this.blogs = this.blogsOriginal;
  } else {
    const texto = this.filtro.toLowerCase();
    this.blogs = this.blogsOriginal.filter(item => 
      item.url.toLowerCase().includes(texto) ||
      item.title.toLowerCase().includes(texto) ||
      item.description.toLowerCase().includes(texto) ||
      item.resumen.toLowerCase().includes(texto)
    );
  }
}



  mostrarForm() {
    this.mostrarFormulario = !this.mostrarFormulario; // Cambiar el valor de mostrarFormulario

  }

  eliminarBlog(item: Blog) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Realmente quieres eliminar este archivo?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        // Restablecer la bandera después de cerrar el diálogo de confirmación
        if (confirmado) {
          //Consulta para eliminar el registro
          this.adminService.deleteBlog(item, 3).subscribe(
            () => {
              this.snackBar.open('Blog Eliminado Exitosamente', 'Cerrar', { duration: 5000 }); //Abre una barra al fondo para mostrar un mensaje emergente
              this.obtenerBlogs();
            },
            error => {
              console.error('Error al eliminar el blog:', error);
              this.snackBar.open('No se pudo eliminar el blog', 'Cerrar', { duration: 3000 });
            }
          );
        } else {
          console.log('Sin cambios')
        }

      });
  }



}

