import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Blog } from '../../classes/blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';

import 'tinymce/tinymce.min.js';  // Importa TinyMCE directamente

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnInit {
  public blogModel: Blog = new Blog("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 0);
  public editorContent = `<p>Escribe tu contenido aquí...</p>`;

  public ultimoBlog: Blog = new Blog("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 0);


  fileToUpload: File | null = null;
  fileToUpload2: File | null = null;

  @ViewChild('h1') h1Input!: ElementRef;
  @ViewChild('slug') slugInput!: ElementRef;


  @ViewChild('fileInput1') fileUploadInput!: ElementRef;
  @ViewChild('fileInput2') fileUploadInput2!: ElementRef;
  eliminarDocClicked: boolean = false; // Nueva bandera para controlar si se hace clic en "Eliminar Doc"

  public mostrarGaleria: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
  ) { }


  ngOnInit() {
    this.blogModel.robots = "INDEX, FOLLOW";
    this.blogModel.status = 2;
    this.obtenerUltimoBlog();
  }

  decodeHtml(html: string): string { //Decodificar el contenido legible para TinyMCE
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }


  obtenerUltimoBlog() {
    this.adminService.getLastBlog(8).subscribe(
      (blog: Blog) => {
        if (blog) {
          this.ultimoBlog = blog;
          console.log("El id del ultimo blog es: ", this.ultimoBlog.id! + 1, "Y su titulo es: ", this.ultimoBlog.h1);
        } else {
          this.ultimoBlog = new Blog("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 1);
        }
      },

    );
  }



  volver() {
    this.router.navigate(['/lista-blogs']);
  }

  onSubmit() {
    /*if (this.ultimoBlog.id !== 1) {
      this.ultimoBlog.id!++;
    }
*/
    const formDataToSend = new FormData();
    if (this.fileToUpload) {
      formDataToSend.append('fileInput1', this.fileToUpload || '');
      formDataToSend.append('fileInput2', this.fileToUpload2 || '');



      if (this.blogModel.url !== '' && this.blogModel.h1 !== '') {
        this.adminService.addBlog(2, this.blogModel, formDataToSend).subscribe(
          () => {
            /* this.slugInput.nativeElement.style.border = '1px solid #ccc';
             this.h1Input.nativeElement.style.border = '1px solid #ccc';
             this.fileUploadInput.nativeElement.style.border = '1px solid #ccc';
             this.fileUploadInput.nativeElement.value = '';*/
            this.snackBar.open('Blog Generado Exitosamente', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/lista-blogs']);

            //this.router.navigate(['/editar-contenido', this.ultimoBlog.id]);
          },
          error => {
            console.error('Error al Actualizar Blog:', error);
            this.snackBar.open('Faltan Campos por Rellenar', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        /*this.slugInput.nativeElement.style.border = '2px solid red';
        this.h1Input.nativeElement.style.border = '2px solid red';*/
        this.snackBar.open('Rellena los campos solicitados', 'Cerrar', { duration: 4000 });

      }

    } else {
      this.fileUploadInput.nativeElement.style.border = '2px solid red';
      this.snackBar.open('Primero Carga un Imagen CARD', 'Cerrar', { duration: 5000 });
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

}



