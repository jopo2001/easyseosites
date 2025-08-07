import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { domain } from '../../classes/globals';
import { Router } from '@angular/router';
import { FooterEncabezados, FooterEnlaces, FooterGlobal, FooterLastOrdenEnlaces } from '../../classes/footer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrl: './footer-main.component.css',
})
export class FooterMainComponent {
  public domain = domain;

  formFooterGlobal: FormGroup;
  formEditGlobal: FormGroup;
  dataFooterGlobal: FooterGlobal[] = [];

  mostrarFormularioAgregar = false;

  formFooterEncabezados: FormGroup;  
  formEditEncabezado: FormGroup;
  dataFooterEncabezado: FooterEncabezados[] = [];

  formFooterEnlaces: FormGroup;
  formEditEnlaces: FormGroup;
  dataFooterEnlaces: FooterEnlaces[] = [];  

  constructor(
    private fb: FormBuilder,
    private gralService: GralService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formFooterGlobal = this.fb.group({
      logo: ['', Validators.required],
      desc_empresa: '',
      columnas_permitidas: '',
      status: '',
    });

    this.formEditGlobal = this.fb.group({
      id: '',
      logo: ['', Validators.required],
      desc_empresa: '',
      columnas_permitidas: '',
      status: '',
    });

    this.formFooterEncabezados = this.fb.group({
      nombre: '',
      status: '',
      orden: '',
      id_global: '',
      id_user: [1] // Puedes cambiarlo si usas auth
    });

    this.formEditEncabezado = this.fb.group({
      id: '',
      nombre: '',
      status: '',
      orden: '',
      id_global: '',
      id_user: [1] // Puedes cambiarlo si usas auth
    });

    this.formFooterEnlaces = this.fb.group({
      id_column_encabezado: '',
      nombre: '',
      enlace: '',
      orden: '',
      status: '',
      id_user: [1] // Puedes cambiarlo si usas auth
    });

    this.formEditEnlaces = this.fb.group({
      id: '',
      id_column_encabezado: '',
      nombre: '',
      enlace: '',
      orden: '',
      status: '',
      id_user: [1] // Puedes cambiarlo si usas auth
    });
  }

  ngOnInit() {
    this.loadFooterGlobal();
    this.loadEncabezado();
    this.loadEnlaces();
  }

  loadFooterGlobal(): void {
    this.gralService.getFooterGlobal().subscribe({
      next: (data) => {
        this.dataFooterGlobal = data;
      },      
      error: (err) => {
        console.error('Error cargando datos del footer global:', err);
      },
    });
  }

  image = '';
  editGlobal(item: any) {
    
    this.image = item.logo;
    
    let status = null;

    if (item.status == 'Activo') {
      status = 1;      
    } else {
      status = 0;
    }

    // Si tienes un formulario reactivo, rellena los valores:
    this.formEditGlobal.patchValue({
      id: item.id,
      desc_empresa: item.desc_empresa,
      columnas_permitidas: item.columnas_permitidas,
      status: status,
    });
  }

  logoFile: File | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
    }
  }

  SubmitFooterGlobal() {
    // if (this.formFooterGlobal.invalid) return;
    const formData = new FormData();

    const footerGlobalModel = {
      ...this.formFooterGlobal.value,
      status: this.formFooterGlobal.value.status ? 'Activo' : 'Inactivo',      
    };

    formData.append('footerGlobalModel', JSON.stringify(footerGlobalModel));

    if (this.logoFile) {
      formData.append('fileInput1', this.logoFile); // imagen
    }

    this.gralService.createFooterGlobal(formData).subscribe({
      next: (res) => {
        this.loadFooterGlobal();

        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Creado con exito.',
          timer: 2000,
          showConfirmButton: false,
        });

        this.formFooterGlobal.reset(); //
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

  updateGlobal() {
    // const id = this.route.snapshot.paramMap.get('id');
    const formData = new FormData();

    const footerGlobalModel = {
      ...this.formEditGlobal.value,
      status: this.formEditGlobal.value.status ? 'Activo' : 'Inactivo',      
      logo: this.image,
    };

    formData.append('footerGlobalModel', JSON.stringify(footerGlobalModel));

    const id = this.formEditGlobal.value.id;    

    if (this.logoFile === null) {
      formData.append('logo', this.image);
    } else {    
      formData.append('fileInput1', this.logoFile);
    }

    this.gralService.updateFooterGlobal(Number(id), formData).subscribe({
      next: (res) => {
        this.loadFooterGlobal();

        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Actualizado con exito.',
          timer: 2000,
          showConfirmButton: false,
        });
        this.logoFile = null;
        this.formEditGlobal.reset(); //
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

  eliminarGlobal(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el global permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gralService.deleteFooterGlobal(id).subscribe({
          next: () => {
            this.loadFooterGlobal();
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

  /* ENCABEZADO */

  loadEncabezado(): void {
    this.gralService.getFooterEncabezado().subscribe({
      next: (data) => {
        this.dataFooterEncabezado = data;
        let item = data[0];
        
        this.formFooterEncabezados.patchValue({                    
          orden: Number(item.orden) + 1,
        });

      },
      error: (err) => {
        console.error('Error cargando datos del footer global:', err);
      },
    });
  }

  editEncabezado(item: any) {
    
    let status = null;

    if (item.status == 'Activo') {
      status = 1;      
    } else {
      status = 0;
    }

    // Si tienes un formulario reactivo, rellena los valores:
    this.formEditEncabezado.patchValue({
      id: item.id,
      nombre: item.nombre,
      orden: item.orden,
      status: status,
      id_global: item.id_global,
    });
  }

  createEncabezado() {
    const formData = new FormData();

    const formFooterEncabezados = {
      ...this.formFooterEncabezados.value,
      status: this.formFooterEncabezados.value.status ? 'Activo' : 'Inactivo',      
    };

    formData.append('footerEncabezadoModel', JSON.stringify(formFooterEncabezados));    

    this.gralService.createFooterEncabezado(formData).subscribe({
      next: (res) => {
        this.loadEncabezado();

        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Creado con exito.',  
          timer: 2000,
          showConfirmButton: false,
        });

        this.formFooterEncabezados.reset(); //
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

  updateEncabezado() {
    // const id = this.route.snapshot.paramMap.get('id');
    const formData = new FormData();

    const formEditEncabezado = {
      ...this.formEditEncabezado.value,
      status: this.formEditEncabezado.value.status ? 'Activo' : 'Inactivo',      
      logo: this.image,
    };

    formData.append('footerEncabezadoModel', JSON.stringify(formEditEncabezado));

    const id = this.formEditEncabezado.value.id;    

    this.gralService.updateFooterEncabezado(Number(id), formData).subscribe({
      next: (res) => {
        this.loadEncabezado();

        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Actualizado con exito.',
          timer: 2000,
          showConfirmButton: false,
        });
        this.logoFile = null;
        this.formEditGlobal.reset(); //
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

  eliminarEncabezado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el encabezado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gralService.deleteFooterEncabezado(id).subscribe({
          next: () => {
            this.loadEncabezado();
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


  /* ENLACES */
  onEncabezadoChange(id: string) {
      if (id) {

        this.gralService.getLastOrdenEnlaces(Number(id)).subscribe((items) => {
          
          const siguienteOrden = Number(items.data.orden) + 1;

          this.formFooterEnlaces.patchValue({
              orden: siguienteOrden,
          });
          
        });  

      } else {

        this.formFooterEnlaces.patchValue({                    
              orden: Number(1),
        });

      } 
  }

  loadEnlaces(): void {
    this.gralService.getFooterEnlaces().subscribe({
      next: (data) => {
        this.dataFooterEnlaces = data;                
        this.formFooterEnlaces.patchValue({                    
          orden: Number(1),
        });
      },
      error: (err) => {
        console.error('Error cargando datos del footer global:', err);
      },
    });
  }

  editEnlace(item: any) {

    let status = null;

    if (item.status == 'Activo') {
      status = 1;      
    } else {
      status = 0;
    }

    // Si tienes un formulario reactivo, rellena los valores:
    this.formEditEnlaces.patchValue({
      id: item.id,
      id_column_encabezado: item.id_column_encabezado,
      nombre: item.nombre,
      enlace: item.enlace,
      orden: item.orden,
      status: status,
    });
  }

  createEnlace() {
    const formData = new FormData();

    const formFooterEnlaces = {
      ...this.formFooterEnlaces.value,
      status: this.formFooterEnlaces.value.status ? 'Activo' : 'Inactivo',      
    };

    formData.append('footerEnlaceModel', JSON.stringify(formFooterEnlaces));    

    this.gralService.createFooterEnlaces(formData).subscribe({
      next: (res) => {
        this.loadEnlaces();

        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Creado con exito.',
          timer: 2000,
          showConfirmButton: false,
        });

        this.formFooterEnlaces.reset(); //
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

  updateEnlace() {
    const formData = new FormData();

    const formEditEnlaces = {
      ...this.formEditEnlaces.value,
      status: this.formEditEnlaces.value.status ? 'Activo' : 'Inactivo',
    };

    formData.append('footerEnlaceModel', JSON.stringify(formEditEnlaces));

    const id = this.formEditEnlaces.value.id;    

    this.gralService.updateFooterEnlaces(Number(id), formData).subscribe({
      next: (res) => {
        this.loadEnlaces();

        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Actualizado con exito.',
          timer: 2000,
          showConfirmButton: false,
        });

        this.formEditEnlaces.reset(); //
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

  eliminarEnlace(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el enlace permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gralService.deleteFooterEnlaces(id).subscribe({
          next: () => {
            this.loadEnlaces();
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
