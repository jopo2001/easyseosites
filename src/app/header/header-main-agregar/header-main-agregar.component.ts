import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header-main-agregar',
  templateUrl: './header-main-agregar.component.html',
  styleUrl: './header-main-agregar.component.css'
})
export class HeaderMainAgregarComponent {
  formMenu: FormGroup;
  mostrarFormularioAgregar = false;

  constructor(private fb: FormBuilder, private gralService: GralService,
  private snackBar: MatSnackBar,
  private router: Router
  ) {

     this.formMenu = this.fb.group({
      nombre: ['', Validators.required],
      url: [''],
      orden: [1],
      status: [true],
      subnivel: [false],
      id_user_cambio: [1]  // o del login
    });
    
   }

  ngOnInit() {
   

  }

guardarNuevoMenu() {
  if (this.formMenu.invalid) return;

  const formData = new FormData();
  const menuModel = {
    ...this.formMenu.value,
    status: this.formMenu.value.status ? 'Activo' : 'Inactivo',
    subnivel: this.formMenu.value.subnivel ? 1 : 0
  };

  formData.append('menuModel', JSON.stringify(menuModel));

  this.gralService.createHeaderMenu(formData).subscribe({
    next: res => {
      this.snackBar.open('Enlace creado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });

      this.formMenu.reset();
      this.mostrarFormularioAgregar = false;

      this.router.navigate(['/header/configuracion']);
    },
    error: err => {
      console.error(err);
      this.snackBar.open('Error al crear el enlace', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  });
}




}
