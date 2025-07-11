import { Component, OnInit } from '@angular/core';
import { HeaderMenu, HeaderGlobal, HeaderSubmenu } from '../../classes/header';
import { GralService } from '../../servicios/gral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.css'
})
export class HeaderMainComponent implements OnInit {

  ordenModificadoSubmenus: { [menuId: number]: boolean } = {};
  submenusPorMenu: { [menuId: number]: HeaderSubmenu[] } = {};

  headerMenus: HeaderMenu[] = [];
  submenus: HeaderSubmenu[] = [];

  //activeMenuId: number | null = null;
  activeMenuIds: number[] = [];

  ordenModificado = false;
  allExpanded: boolean = false;
  public mostrarArbol: boolean = false;




  constructor(private gralService: GralService, private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.loadMenus();
    this.loadSubmenus();
  }

  loadMenus(): void {
    this.gralService.getHeaderMenu().subscribe({
      next: data => {
        this.headerMenus = data;

        // Si hay algún menú con subnivel = 1, expandir el primero automáticamente
        /*this.activeMenuIds = this.headerMenus
          .filter(m => +m.subnivel === 1)
          .map(m => m.id);
          */
        this.activeMenuIds = [];


      },
      error: err => console.error('Error cargando menús:', err)
    });
  }

  loadSubmenus(): void {
    this.gralService.getHeaderSubmenu().subscribe({
      next: data => {
        this.submenus = data;

        // Agrupa los submenús por menuId
        this.submenusPorMenu = {};
        for (const sub of data) {
          if (!this.submenusPorMenu[sub.id_header_menu]) {
            this.submenusPorMenu[sub.id_header_menu] = [];
          }
          this.submenusPorMenu[sub.id_header_menu].push(sub);
        }

        // Ordena cada bloque por su orden
        Object.keys(this.submenusPorMenu).forEach(menuId => {
          this.submenusPorMenu[+menuId].sort((a, b) => a.orden - b.orden);
        });

      },
      error: err => console.error('Error cargando submenús:', err)
    });
  }

  toggleAllMenus(): void {
    if (this.allExpanded) {
      // Colapsar todos
      this.activeMenuIds = [];
      this.allExpanded = false;
    } else {
      // Expandir todos los que tienen subnivel = 1
      this.activeMenuIds = this.headerMenus
        .filter(m => +m.subnivel === 1)
        .map(m => m.id);
      this.allExpanded = true;
    }
  }


  getSubmenusForMenu(menuId: number): HeaderSubmenu[] {
    return this.submenus.filter(sub => sub.id_header_menu === menuId);
  }

  toggleMenu(menuId: number): void {
    if (this.activeMenuIds.includes(menuId)) {
      this.activeMenuIds = this.activeMenuIds.filter(id => id !== menuId);
    } else {
      this.activeMenuIds.push(menuId);
    }
  }


  editarMenu(menu: HeaderMenu) {
    // implementar navegación o modal
    console.log('Editar:', menu);
  }

  eliminarMenu(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el enlace permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gralService.deleteHeaderMenu(id).subscribe({
          next: () => {
            this.loadMenus();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El enlace se eliminó correctamente.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Error eliminando Enlace:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el enlace. Intenta de nuevo.'
            });
          }
        });
      }
    });
  }


  //Metodos Menú Principal
  //Mover Menú Principal
  drop(event: CdkDragDrop<HeaderMenu[]>): void {
    moveItemInArray(this.headerMenus, event.previousIndex, event.currentIndex);
    this.ordenModificado = true;
  }

  guardarOrden(): void {
    const actualizaciones = this.headerMenus.map((menu, index) => {
      return this.gralService.updateHeaderMenu(
        menu.id,
        this.crearFormDataOrden(menu, index + 1)
      );
    });

    Promise.all(actualizaciones.map(obs => obs.toPromise()))
      .then(() => {
        this.snackBar.open('Orden guardado correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.ordenModificado = false;
        this.loadMenus();
      })
      .catch(error => {
        console.error('Error guardando orden:', error);
        this.snackBar.open('Error guardando el orden.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      });
  }


  crearFormDataOrden(menu: HeaderMenu, nuevoOrden: number): FormData {
    const formData = new FormData();

    const menuModel = {
      status: menu.status,
      url: menu.url,
      nombre: menu.nombre,
      id_user_cambio: menu.id_user_cambio,
      orden: nuevoOrden,
      subnivel: menu.subnivel
    };

    formData.append('menuModel', JSON.stringify(menuModel));

    return formData;
  }


  //Metodos para submenu

  //Mover Submenu
  dropSubmenu(event: CdkDragDrop<HeaderSubmenu[]>, menuId: number): void {
    const submenus = this.submenusPorMenu[menuId];
    moveItemInArray(submenus, event.previousIndex, event.currentIndex);
    this.ordenModificadoSubmenus[menuId] = true;
  }

  guardarOrdenSubmenu(menuId: number): void {
    const submenus = this.submenusPorMenu[menuId];
    const actualizaciones = submenus.map((sub, index) => {
      return this.gralService.updateHeaderSubmenu(
        sub.id,
        this.crearFormDataOrdenSubmenu(sub, index + 1)
      );
    });

    Promise.all(actualizaciones.map(obs => obs.toPromise()))
      .then(() => {
        this.snackBar.open('Orden de submenús guardado correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.ordenModificadoSubmenus[menuId] = false;
        this.loadSubmenus(); // Refresca los datos
      })
      .catch(error => {
        console.error('Error guardando orden de submenús:', error);
        this.snackBar.open('Error guardando orden de submenús.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      });
  }


  crearFormDataOrdenSubmenu(sub: HeaderSubmenu, nuevoOrden: number): FormData {
    const formData = new FormData();
    const submenuModel = {
      status: sub.status,
      url: sub.url,
      nombre: sub.nombre,
      id_user_cambio: sub.id_user_cambio,
      orden: nuevoOrden,
      id_header_menu: sub.id_header_menu
    };

    formData.append('submenuModel', JSON.stringify(submenuModel));
    return formData;
  }


  eliminarSubmenu(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el submenú permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gralService.deleteHeaderSubmenu(id).subscribe({
          next: () => {
            this.loadSubmenus();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El submenú se eliminó correctamente.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Error eliminando submenú:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el submenú. Intenta de nuevo.'
            });
          }
        });
      }
    });
  }

  editarSubmenu(sub: HeaderSubmenu) {
    console.log('Editar:', sub);
    // Aquí puedes abrir modal o navegar a ruta de edición
  }





}
