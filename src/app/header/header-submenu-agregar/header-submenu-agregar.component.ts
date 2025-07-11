import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { domain } from '../../classes/globals';
import { HeaderMenu, HeaderSubmenu } from '../../classes/header';

@Component({
  selector: 'app-header-submenu-agregar',
  templateUrl: './header-submenu-agregar.component.html',
  styleUrl: './header-submenu-agregar.component.css'
})
export class HeaderSubmenuAgregarComponent {
  public domain = domain;
  public subheaderModel: HeaderSubmenu = new HeaderSubmenu(0, '', '', '', 0, '', 0,0);
  public headerModel: HeaderMenu = new HeaderMenu(0, '', '', '', 0, '', 0, 0);


  formMenu: FormGroup;
  id_header_menu: number = 0;

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
           this.id_header_menu = Number(this.route.snapshot.paramMap.get('id_menu'));
           this.obtenerDatosMenu();
  }

  
  obtenerDatosMenu() {
      this.gralService.getHeaderMenuParticular(Number(this.id_header_menu)).subscribe((menu: HeaderMenu) => {
        this.headerModel = menu;
      });
    
  }




  guardarEdicion() {


    if (this.formMenu.invalid) return;

    const formData = new FormData();
    const menuModel = {
      ...this.formMenu.value,
      status: this.formMenu.value.status ? 'Activo' : 'Inactivo',
      subnivel: this.formMenu.value.subnivel ? 1 : 0,
      id_header_menu: this.id_header_menu
    };

    formData.append('submenuModel', JSON.stringify(menuModel));

    this.gralService.createHeaderSubmenu(formData).subscribe({
      next: res => {
        this.snackBar.open('Enlace creado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        this.router.navigate(['/header/configuracion']);
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