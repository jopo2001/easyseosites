import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ScriptsBody, ScriptsHead } from '../../classes/scripts_bd';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-body-scripts-editar',
  templateUrl: './body-scripts-editar.component.html',
  styleUrl: './body-scripts-editar.component.css'
})
export class BodyScriptsEditarComponent implements OnInit{
  public scriptBody: ScriptsBody =  new ScriptsBody(0,'','','', 0, '', 0);
  formScript: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gralService: GralService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formScript = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''], 
      codigo: ['', Validators.required],
      id_user: [1], // O tu lógica de usuario logueado

    });
  }

  ngOnInit(): void {
    this.obtenerDatosScriptBody();
  }

  

  obtenerDatosScriptBody() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.gralService.getScriptBodyParticular(Number(id)).subscribe((script: ScriptsBody) => {
          this.scriptBody = script;
  
          // Rellena el formulario con los datos
          this.formScript.patchValue({
            nombre: script.nombre,
            description: script.description,
            codigo: script.codigo
          });
        });
      }
    }

  guardarEdicionScript(): void {
  if (this.formScript.invalid) {
    this.formScript.markAllAsTouched();
    return;
  }

  const id = this.scriptBody.id;
  const scriptModel = {
    ...this.formScript.value
  };

  const formData = new FormData();
  formData.append('scriptBody', JSON.stringify(scriptModel));

  this.gralService.updateScriptBody(id, formData).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'El script se actualizó correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
      //this.router.navigate(['/scripts/main-head']);
      this.obtenerDatosScriptBody();
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el script. Intenta de nuevo.'
      });
    }
  });
}

}