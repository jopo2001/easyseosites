import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ScriptsHead } from '../../classes/confGenerales';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-head-scripts-editar',
  templateUrl: './head-scripts-editar.component.html',
  styleUrl: './head-scripts-editar.component.css'
})
export class HeadScriptsEditarComponent implements OnInit{
  public scriptHead: ScriptsHead =  new ScriptsHead(0,'','','',0,'');
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
    this.obtenerDatosScriptHead();
  }

  

  obtenerDatosScriptHead() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.gralService.getScriptHeadParticular(Number(id)).subscribe((script: ScriptsHead) => {
          this.scriptHead = script;
  
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

  const id = this.scriptHead.id;
  const scriptModel = {
    ...this.formScript.value
  };

  const formData = new FormData();
  formData.append('scriptHead', JSON.stringify(scriptModel));

  this.gralService.updateScriptHead(id, formData).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'El script se actualizó correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
      //this.router.navigate(['/scripts/main-head']);
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