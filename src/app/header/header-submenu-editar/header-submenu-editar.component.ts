import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { domain } from '../../classes/globals';
import { HeaderMenu, HeaderSubmenu } from '../../classes/header';

@Component({
  selector: 'app-header-submenu-editar',
  templateUrl: './header-submenu-editar.component.html',
  styleUrl: './header-submenu-editar.component.css'
})
export class HeaderSubmenuEditarComponent {
  public domain = domain;
  public subheaderModel: HeaderSubmenu = new HeaderSubmenu(0, '', '', '', 0, '', 0,0);

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
      id_header_menu: [null],  // <-- AGREGADO AQUÍ
      id_user_cambio: [1] // Puedes cambiarlo si usas auth
    });
  }

  ngOnInit() {
    this.obtenerDatossubMenu();
  }

  obtenerDatossubMenu() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gralService.getHeaderSubmenuParticular(Number(id)).subscribe((submenu: HeaderSubmenu) => {
        this.subheaderModel = submenu;

        // Rellena el formulario con los datos
        this.formMenu.patchValue({
          nombre: submenu.nombre,
          url: submenu.url,
          orden: submenu.orden,
          status: submenu.status === 'Activo',
          id_header_menu: submenu.id_header_menu,
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

    formData.append('submenuModel', JSON.stringify(menuModel));

    this.gralService.updateHeaderSubmenu(this.subheaderModel.id, formData).subscribe({
      next: res => {
        this.snackBar.open('Enlace actualizado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        //this.router.navigate(['/header/configuracion']);
        this.obtenerDatossubMenu();
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