import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LP_EN, LP_ES } from '../../classes/landingPage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../servicios/admin.service';
import { domain } from '../../classes/globals';
import { PageService } from '../../servicios/pages.service';


@Component({
  selector: 'app-lista-lp',
  templateUrl: './lista-lp.component.html',
  styleUrl: './lista-lp.component.css'
})
export class ListaLPComponent implements OnInit {
  public domain = domain;
  mostrarFormulario: boolean = false; //Variable para mostrar formulario: 

  @ViewChild('fileUpload3') fileUploadInput3!: ElementRef;


  blogModel = new LP_ES("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 0);
  blogs: LP_ES[] = [];
  banderaAdd = 0;
  contador = 1;
  opcionStatus: any[] = [
  ];

  filtro: string = '';
  blogsOriginal: LP_ES[] = [];


  constructor(
    private adminService: AdminService,
    private pageService: PageService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
    private router: Router
  ) { }


  ngOnInit() {
    this.obtenerLPS();
  }

  
  /*Obtener sucursales con filtros */

  stringToNumber(status: string | number): number {
    return Number(status);
  }

  obtenerLPS() { //Consultas para no depender del PHP
    this.pageService.getPageESGlobal().subscribe(
      (pageES: LP_ES[]) => {      
        this.blogs = pageES;
        this.blogsOriginal = pageES;
        // console.log('Tipo data: ', this.blogs)
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

  eliminarLP(item: LP_ES) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Deseas eliminar esta LP?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        // Restablecer la bandera después de cerrar el diálogo de confirmación
        if (confirmado) {
          //Consulta para eliminar el registro
          this.pageService.deletePageES(item.id!).subscribe(
            () => {
              this.snackBar.open('Landing Eliminada Exitosamente', 'Cerrar', { duration: 5000 }); //Abre una barra al fondo para mostrar un mensaje emergente
              this.obtenerLPS();
            },
            error => {
              console.error('Error al eliminar la LP:', error);
              this.snackBar.open('No se pudo eliminar la LP', 'Cerrar', { duration: 3000 });
            }
          );
        } else {
          console.log('Sin cambios')
        }

      });
  }



}

