import { Component, OnInit } from '@angular/core';
import { HeaderMenu, HeaderGlobal, HeaderSubmenu } from '../../classes/header';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.css'
})
export class HeaderMainComponent implements OnInit {

  headerMenus: HeaderMenu[] = [];
  submenus: HeaderSubmenu[] = [];

  activeMenuId: number | null = null;

  constructor(private gralService: GralService,     private snackBar: MatSnackBar
) {}


  ngOnInit(): void {
    this.loadMenus();
    this.loadSubmenus();
  }

  loadMenus(): void {
    this.gralService.getHeaderMenu().subscribe({
      next: data => this.headerMenus = data,
      error: err => console.error('Error cargando menús:', err)
    });
  }

  loadSubmenus(): void {
    this.gralService.getHeaderSubmenu().subscribe({
      next: data => this.submenus = data,
      error: err => console.error('Error cargando submenús:', err)
    });
  }

  getSubmenusForMenu(menuId: number): HeaderSubmenu[] {
    return this.submenus.filter(sub => sub.id_header_menu === menuId);
  }

  toggleMenu(menuId: number): void {
    this.activeMenuId = this.activeMenuId === menuId ? null : menuId;
  }

  editarMenu(menu: HeaderMenu) {
    // implementar navegación o modal
    console.log('Editar:', menu);
  }

  eliminarMenu(id: number) {
    if (confirm('¿Deseas eliminar este Enlace?')) {
      this.gralService.deleteHeaderMenu(id).subscribe({
        next: () => {
          this.loadMenus();
          this.snackBar.open('Enlace eliminado correctamente.', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: err => {
          console.error('Error eliminando Enlace:', err);
          this.snackBar.open('Error eliminando el Enlace.', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

}
