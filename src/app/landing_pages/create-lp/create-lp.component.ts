import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LP_EN, LP_ES } from '../../classes/landingPage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../servicios/admin.service';

import 'tinymce/tinymce.min.js';  // Importa TinyMCE directamente
import { PageService } from '../../servicios/pages.service';

@Component({
  selector: 'app-create-lp',
  templateUrl: './create-lp.component.html',
  styleUrl: './create-lp.component.css',
  standalone: false
})
export class CreateLPComponent implements OnInit {
  public blogModel: LP_ES = new LP_ES("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 0);
  public editorContent = `<p>Escribe tu contenido aquí...</p>`;

  public ultimoBlog: LP_ES = new LP_ES("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 0);


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
    private pageService: PageService,
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
      (blog: LP_ES) => {
        if (blog) {
          this.ultimoBlog = blog;
          console.log("El id del ultimo blog es: ", this.ultimoBlog.id! + 1, "Y su titulo es: ", this.ultimoBlog.h1);
        } else {
          this.ultimoBlog = new LP_ES("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 1);
        }
      },

    );
  }



  volver() {
    this.router.navigate(['/lista-blogs']);
  }

 onSubmit() {
  const formDataToSend = new FormData();

  // Agrega archivos si están cargados
  if (this.fileToUpload) {
    formDataToSend.append('fileInput1', this.fileToUpload);
  }
  if (this.fileToUpload2) {
    formDataToSend.append('fileInput2', this.fileToUpload2);
  }

  // Agrega el objeto de datos como JSON
  formDataToSend.append('PageEs', JSON.stringify(this.blogModel));

  // Validación básica antes de enviar
  if (this.blogModel.url !== '' && this.blogModel.h1 !== '') {
    this.pageService.createPageES(formDataToSend).subscribe(
      () => {
        this.snackBar.open('Landing generada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/lista-lp']);
      },
      error => {
        console.error('Error al crear la LP:', error);
        this.snackBar.open('Faltan campos por rellenar o error en el servidor', 'Cerrar', { duration: 3000 });
      }
    );
  } else {
    this.slugInput.nativeElement.style.border = '2px solid red';
    this.h1Input.nativeElement.style.border = '2px solid red';
    this.snackBar.open('Rellena los campos solicitados', 'Cerrar', { duration: 4000 });
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



