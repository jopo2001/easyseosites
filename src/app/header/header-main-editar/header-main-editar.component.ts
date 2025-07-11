import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { domain } from '../../classes/globals';
import { HeaderMenu } from '../../classes/header';


@Component({
  selector: 'app-header-main-editar',
  templateUrl: './header-main-editar.component.html',
  styleUrl: './header-main-editar.component.css'
})
export class HeaderMainEditarComponent {
  public domain = domain;
  public headerModel: HeaderMenu = new HeaderMenu(0, '', '', '', 0, '', 0, 0);

  formMenu: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gralService: GralService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formMenu = this.fb.group({
      nombre: ['', Validators.required],
      url: [''],
      orden: [1],
      status: [true],
      subnivel: [false],
      id_user_cambio: [1] // Puedes cambiarlo si usas auth
    });
  }

  ngOnInit() {
    this.obtenerDatosMenu();
  }

  obtenerDatosMenu() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gralService.getHeaderMenuParticular(Number(id)).subscribe((menu: HeaderMenu) => {
        this.headerModel = menu;

        // Rellena el formulario con los datos
        this.formMenu.patchValue({
          nombre: menu.nombre,
          url: menu.url,
          orden: menu.orden,
          status: menu.status === 'Activo',
          subnivel: menu.subnivel === 1
        });
      });
    }
  }

  guardarEdicion() {
    if (this.formMenu.invalid) return;

    const formData = new FormData();
    const menuModel = {
      ...this.formMenu.value,
      status: this.formMenu.value.status ? 'Activo' : 'Inactivo',
      subnivel: this.formMenu.value.subnivel ? 1 : 0
    };

    formData.append('menuModel', JSON.stringify(menuModel));

    this.gralService.updateHeaderMenu(this.headerModel.id, formData).subscribe({
      next: res => {
        this.snackBar.open('Enlace actualizado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        //this.router.navigate(['/header/configuracion']);
        this.obtenerDatosMenu();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Error al actualizar el enlace', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}