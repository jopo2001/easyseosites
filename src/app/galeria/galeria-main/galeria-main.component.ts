import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GralService } from '../../servicios/gral.service';
import { domain } from '../../classes/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GaleriaGlobal, GaleriaContent } from '../../classes/galeria';

@Component({
  selector: 'app-galeria-main',
  templateUrl: './galeria-main.component.html',
  styleUrl: './galeria-main.component.css',
})
export class GaleriaMainComponent {
  public domain = domain;

  formGaleriaGlobal: FormGroup;
  formEditGaleriaGlobal: FormGroup;
  dataGaleriaGlobal: GaleriaGlobal[] = [];

  formGaleriaContent: FormGroup;
  formEditGaleriaContent: FormGroup;
  dataGaleriaContent: GaleriaContent[] = [];

  constructor(
    private fb: FormBuilder,
    private gralService: GralService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formGaleriaGlobal = this.fb.group({
      body: '',
      styles: '',
      columnas_permitidas: '',
      columnas_permitidas_movil: '',
    });

    this.formEditGaleriaGlobal = this.fb.group({
      id: '',
      body: '',
      styles: '',
      columnas_permitidas: '',
      columnas_permitidas_movil: '',
    });

    this.formGaleriaContent = this.fb.group({
      img: '',
      status: '',
      id_user: 1,
      id_global: '',
      text_alternativo: '',
      orden: '',
    });

    this.formEditGaleriaContent = this.fb.group({
      id: '',
      img: '',
      status: '',
      id_user: 1,
      id_global: '',
      text_alternativo: '',
      orden: '',
    });

  }

  ngOnInit() {
    this.loadGaleriaGlobal();
    this.loadGaleriaContent();
  }


    loadGaleriaGlobal(): void {
      this.gralService.getGaleriaGlobal().subscribe({
        next: (data) => {
          this.dataGaleriaGlobal = data;
        },
        error: (err) => {
          console.error('Error cargando datos del footer global:', err);
        },
      });
    }
  
    editGaleriaGlobal(item: any) {

      // Si tienes un formulario reactivo, rellena los valores:
      this.formEditGaleriaGlobal.patchValue({
        id: item.id,
        body: item.body,
        styles: item.styles,
        columnas_permitidas: item.columnas_permitidas,
        columnas_permitidas_movil: item.columnas_permitidas_movil,      
      });
    }
  
    createGaleriaGlobal() {
      const formData = new FormData();
  
      const formGaleriaGlobla = {
        ...this.formGaleriaGlobal.value,
      };
  
      formData.append('GaleriaGlobal', JSON.stringify(formGaleriaGlobla));    
  
      this.gralService.createGaleriaGlobal(formData).subscribe({
        next: (res) => {

          this.loadGaleriaGlobal();
  
          Swal.fire({
            icon: 'success',
            title: 'Creado',
            text: 'Creado con exito.',  
            timer: 2000,
            showConfirmButton: false,
          });
  
          this.formGaleriaGlobal.reset(); //
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el contenido.',
          });
        },
      });
    }
  
    updateGaleriaGlobal() {
      const formData = new FormData();
  
      const formEditGaleriaGlobal = {
        ...this.formEditGaleriaGlobal.value,
      };
  
      formData.append('GaleriaGlobal', JSON.stringify(formEditGaleriaGlobal));
  
      const id = this.formEditGaleriaGlobal.value.id;    
  
      this.gralService.updateGaleriaGlobal(Number(id), formData).subscribe({
        next: (res) => {

          this.loadGaleriaGlobal();
  
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Actualizado con exito.',
            timer: 2000,
            showConfirmButton: false,
          });
          
          this.formEditGaleriaGlobal.reset(); //

        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el contenido.',
          });

        },
      });
    }
  
    eliminarGaleriaGlobal(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el contenido permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {

        if (result.isConfirmed) {

          this.gralService.deleteGaleriaGlobal(id).subscribe({
            next: () => {

              this.loadGaleriaGlobal();

              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Se ha eliminado con exito.',
                timer: 2000,
                showConfirmButton: false,
              });

            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el contenido.',
              });
            },
          });
        }
      });
    }


    loadGaleriaContent(): void {
      this.gralService.getGaleriaContent().subscribe({
        next: (data) => {
          this.dataGaleriaContent = data;

          let item = data[0];
        
          this.formGaleriaContent.patchValue({
            id_global: item.id_global,
            orden: Number(item.orden) + 1,
          });

        },
        error: (err) => {
          console.error('Error cargando datos del footer global:', err);
        },
      });
    }

    logoFile: File | null = null;
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.logoFile = input.files[0];
      }
    }

    image = '';
    editGaleriaContent(item: any) {

      this.image = item.img;
      
      let status = null;

      if (item.status == 'Activo') {
        status = 1;
      } else {
        status = 0;
      }

      this.formEditGaleriaContent.patchValue({
        id: item.id,
        status: status,
        id_user: 1,
        id_global: item.id_global,
        text_alternativo: item.text_alternativo,
        orden: item.orden,
      });
    }
    
    createGaleriaContent() {
      const formData = new FormData();
  
      const formGaleriaContent = {
        ...this.formGaleriaContent.value,
        status: this.formGaleriaContent.value.status ? 'Activo' : 'Inactivo',
      };
  
      formData.append('GaleriaContent', JSON.stringify(formGaleriaContent));   
      
      if (this.logoFile) {
        formData.append('fileInput1', this.logoFile); // imagen
      }
  
      this.gralService.createGaleriaContent(formData).subscribe({
        next: (res) => {

          this.loadGaleriaContent();
          
          Swal.fire({
            icon: 'success',
            title: 'Creado',
            text: 'Creado con exito.',  
            timer: 2000,
            showConfirmButton: false,
          });
  
          this.formGaleriaGlobal.reset(); // limpia el formulario
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el contenido.',
          });
        },
      });
    }
  
    updateGaleriaContent () {
      const formData = new FormData();
  
      const formEditGaleriaContent = {
        ...this.formEditGaleriaContent.value,
        img: this.image,
        status: this.formEditGaleriaContent.value.status ? 'Activo' : 'Inactivo',      
      };
  
      formData.append('GaleriaContent', JSON.stringify(formEditGaleriaContent));
      
      const id = this.formEditGaleriaContent.value.id;      
      
      if (this.logoFile === null) {
        formData.append('img', this.image);
      } else {    
        formData.append('fileInput1', this.logoFile);
      }      

      formData.forEach((item, key) => {
        console.log(`${item} - ${key}`);
      });
  
      this.gralService.updateGaleriaContent(Number(id), formData).subscribe({
        next: (res) => {

          this.loadGaleriaContent();
  
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Actualizado con exito.',
            timer: 2000,
            showConfirmButton: false,
          });
          
          this.formEditGaleriaGlobal.reset();

        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el contenido.',
          });

          console.log(err);          

        },
      });
    }
  
    eliminarGaleriaContent(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el contenido permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {

        if (result.isConfirmed) {

          this.gralService.deleteGaleriaContent(id).subscribe({
            next: () => {

              this.loadGaleriaContent();

              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Se ha eliminado con exito.',
                timer: 2000,
                showConfirmButton: false,
              });

            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el contenido.',
              });
            },
          });
        }
      });
    }


}


