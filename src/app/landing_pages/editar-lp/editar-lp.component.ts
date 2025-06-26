import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LP_EN, LP_ES } from '../../classes/landingPage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../servicios/admin.service';
import { domain } from '../../classes/globals';

import 'tinymce/tinymce.min.js';  // Importa TinyMCE directamente
import { PageService } from '../../servicios/pages.service';

@Component({
  selector: 'app-editar-lp',
  templateUrl: './editar-lp.component.html',
  styleUrl: './editar-lp.component.css'
})
export class EditarLPComponent {
  public domain = domain;
  public blogModel: LP_ES = new LP_ES("", "", 0, "", "", "", "", 0, "", "", "", "", "", "", "", "", "", "", "", 0);
  public editorContent = `<p>Escribe tu contenido aquí...</p>`;
  eliminarDocClicked: boolean = false;
  public mostrarGaleria: boolean = false;


  public urlNew = '';
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
    private pageService: PageService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
  ) { }


  ngOnInit() {
    console.log('Accediendo a dominio: ', this.domain)
    this.obtenerDatosLP();
  }

  obtenerDatosLP() {
    let id = this.route.snapshot.paramMap.get("id");
    id = id ?? "";
    this.pageService.getLPGlobalParticular(Number(id)).subscribe((blog: LP_ES) => {
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


  /*
  volver() {
    this.router.navigate(['/lista-blogs']);
  }
*/

onSubmit() {
  console.log("URL Nueva: ", this.urlNew);
  console.log('URL vieja: ', this.blogModel.url);

  if (this.blogModel.h1 !== '') {
    const formData = new FormData();

    // Agrega el objeto PageEs como JSON
    formData.append('PageEs', JSON.stringify(this.blogModel));

    // Agrega archivos si existen
    if (this.fileToUpload) {
      formData.append('fileInput1', this.fileToUpload);
    }

    if (this.fileToUpload2) {
      formData.append('fileInput2', this.fileToUpload2);
    }

    // Llama al servicio con el FormData
    this.pageService.updatePageES(this.blogModel.id!, formData).subscribe(
      () => {
        this.slugInput.nativeElement.style.border = '1px solid #ccc';
        this.h1Input.nativeElement.style.border = '1px solid #ccc';
        this.obtenerDatosLP();
        this.snackBar.open('Landing Page Actualizado Exitosamente', 'Cerrar', { duration: 5000 });
      },
      error => {
        console.error('Error al Actualizar Landing Page:', error);
        this.snackBar.open('Faltan Campos por Rellenar', 'Cerrar', { duration: 3000 });
      }
    );
  } else {
    this.slugInput.nativeElement.style.border = '2px solid red';
    this.h1Input.nativeElement.style.border = '2px solid red';
    this.snackBar.open('Rellena los campos solicitados', 'Cerrar', { duration: 4000 });
  }
}


  actualizarIMG() {
    this.onSubmit();
  }

  actualizarPortada() {
    this.onSubmit();
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

eliminarCard() {
  this.blogModel.img = ''; // Vaciar la propiedad

   this.snackBar.open(
    'Imagen de la tarjeta eliminada. Presiona "Actualizar Landing Page" para guardar los cambios.',
    'Cerrar',
    { duration: 5000 }
  );
}

eliminarPortada() {
  this.blogModel.portada = ''; // Vaciar portada
   this.snackBar.open(
    'Imagen de portada eliminada. Presiona "Actualizar Landing Page" para guardar los cambios.',
    'Cerrar',
    { duration: 5000 }
  );
}






}
