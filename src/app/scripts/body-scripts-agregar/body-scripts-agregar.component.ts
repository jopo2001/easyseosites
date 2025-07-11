import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-scripts-agregar',
  templateUrl: './body-scripts-agregar.component.html',
  styleUrl: './body-scripts-agregar.component.css'
})
export class BodyScriptsAgregarComponent {
  formScript: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gralService: GralService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formScript = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''], 
      codigo: ['', Validators.required],
      id_user: [1] // O tu lógica de usuario logueado
    });
  }

  guardarNuevoScript(): void {
    if (this.formScript.invalid) {
      this.formScript.markAllAsTouched();
      return;
    }

    const scriptModel = {
      ...this.formScript.value
    };

    const formData = new FormData();
    formData.append('scriptBody', JSON.stringify(scriptModel));

    this.gralService.createScriptBody(formData).subscribe({
      next: () => {
        this.snackBar.open('Script creado correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/scripts/main-body']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear el script.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}