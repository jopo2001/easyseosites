import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Blog } from '../../classes/blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { domain } from '../../classes/globals';

import 'tinymce/tinymce.min.js';  // Importa TinyMCE directamente

@Component({
  selector: 'app-editar-blog',
  templateUrl: './editar-blog.component.html',
  styleUrl: './editar-blog.component.css'
})
export class EditarBlogComponent {
  public domain = domain;
  public blogModel: Blog = new Blog("","",0,"","","","",0,"","", "", "", "", "", "", "", "", "", "", 0);
  public editorContent = `<p>Escribe tu contenido aquí...</p>`;
  eliminarDocClicked: boolean = false;
  public mostrarGaleria: boolean = false;


  public urlNew='';
  fileToUpload: File | null = null;
  fileToUpload2: File | null = null;

  @ViewChild('fileInput1') fileUploadInput!: ElementRef;
  @ViewChild('fileInput2') fileUploadInput2!: ElementRef;
  @ViewChild('h1') h1Input!: ElementRef;
  @ViewChild('slug') slugInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
  ) { }


  ngOnInit() {
    console.log('Accediendo a dominio: ', this.domain)
    this.obtenerDatosBlog();
  }

  obtenerDatosBlog() {
    let id = this.route.snapshot.paramMap.get("id");
    id = id ?? "";
    this.adminService.getBlogUP(4, id).subscribe((blog: Blog) => {
      this.blogModel = blog;
      this.blogModel.body = this.decodeHtml(blog.body);
      this.urlNew = this.blogModel.url;
      //console.log('La url es: ', this.blogModel.url)
    }
    );
  }

  decodeHtml(html: string): string { //Decodificar el contenido legible para TinyMCE
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }


  volver() {
    this.router.navigate(['/lista-blogs']);
  }

  onSubmit() {
    console.log("URL Nueva: ", this.urlNew);
    console.log('URL vieja: ', this.blogModel.url)
    //console.log('Te estas activando, valor de eliminarDoc', this.eliminarDocClicked)
    
    if (this.blogModel.h1!=='') { //this.blogModel.url!=='' &&
      this.adminService.updateBlog(5, this.blogModel, this.urlNew).subscribe(
        () => {
          this.slugInput.nativeElement.style.border = '1px solid #ccc';
          this.h1Input.nativeElement.style.border = '1px solid #ccc';
          this.obtenerDatosBlog();
          this.snackBar.open('Blog Actualizado Exitosamente', 'Cerrar', { duration: 5000 });
        },
        error => {
          console.error('Error al Actualizar Blog:', error);
          this.snackBar.open('Faltan Campos por Rellenar', 'Cerrar', { duration: 3000 });
        }
      );
    }
    else{
      this.slugInput.nativeElement.style.border = '2px solid red';
      this.h1Input.nativeElement.style.border = '2px solid red';
      this.snackBar.open('Rellena los campos solicitados', 'Cerrar', { duration: 4000 });
    }

  }

  actualizarIMG() {
    const formDataToSend = new FormData();
    if (this.fileToUpload) {
      formDataToSend.append('fileInput1', this.fileToUpload);

        this.adminService.updateIMG(7, this.blogModel, formDataToSend).subscribe(
          () => {
            this.fileUploadInput.nativeElement.style.border = '1px solid #ccc';
            this.fileUploadInput.nativeElement.value = '';
            this.obtenerDatosBlog();
            this.snackBar.open('Blog Actualizado Exitosamente', 'Cerrar', { duration: 5000 });
          },
          error => {
            console.error('Error al Actualizar Blog:', error);
            this.snackBar.open('Faltan Campos por Rellenar', 'Cerrar', { duration: 3000 });
          }
        );
      
    } else{
      this.fileUploadInput.nativeElement.style.border = '2px solid red';
      this.snackBar.open('Primero Carga un Imagen CARD', 'Cerrar', { duration: 5000 });
    }
  }

  actualizarPortada() {
    const formDataToSend = new FormData();
    if (this.fileToUpload) {
      formDataToSend.append('fileInput2', this.fileToUpload);

        this.adminService.updatePortada(7, this.blogModel, formDataToSend).subscribe(
          () => {
            this.fileUploadInput2.nativeElement.style.border = '1px solid #ccc';
            this.fileUploadInput2.nativeElement.value = '';

            this.obtenerDatosBlog();
            this.snackBar.open('Blog Actualizado Exitosamente', 'Cerrar', { duration: 5000 });
          },
          error => {
            console.error('Error al Actualizar Blog:', error);
            this.snackBar.open('Faltan Campos por Rellenar', 'Cerrar', { duration: 3000 });
          }
        );
      
    } else{
      this.fileUploadInput2.nativeElement.style.border = '2px solid red';
      this.snackBar.open('Primero Carga la Imagen de Portada', 'Cerrar', { duration: 5000 });
    }
  }

  handleFileInput(event: Event, fileType: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      const file = inputElement.files[0];

      if (fileType === 'card') {
        this.fileToUpload = file;
      } else if (fileType === 'portada') {
        this.fileToUpload2 = file;
      }
    }
  }





  eliminarCard(nombreImg: string) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Realmente quieres eliminar este archivo?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        // Restablecer la bandera después de cerrar el diálogo de confirmación
        this.eliminarDocClicked = false;

        if (confirmado === true) {
          //Consulta para eliminar el registro
          this.adminService.deleteIMG(nombreImg, 6, this.blogModel.id!).subscribe(() => {
            this.obtenerDatosBlog();
            this.fileUploadInput.nativeElement.value = '';
            this.fileUploadInput2.nativeElement.value = '';

            if (!this.eliminarDocClicked) {
              this.snackBar.open('Archivo eliminado Exitosamente', undefined, {
                duration: 2500,
              });
            }
          });
        } else {
          console.log('No cambios');
        }


      });
  }


  eliminarPortada(nombreImg: string) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Realmente quieres eliminar este archivo?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        // Restablecer la bandera después de cerrar el diálogo de confirmación
        if (confirmado) {
          //Consulta para eliminar el registro
          this.adminService.deletePortada(nombreImg, 6, this.blogModel.id!).subscribe(() => {
            this.obtenerDatosBlog();
            this.fileUploadInput.nativeElement.value = '';
            this.fileUploadInput2.nativeElement.value = '';
            this.snackBar.open('Archivo eliminado Exitosamente', undefined, {
              duration: 2500,
            });
          });
        } else {
          console.log('No cambios')
        }
      });
  }
  




}
