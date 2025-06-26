import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './servicios/admin.service';
import { User } from './classes/user';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';


declare var bootstrap: any; // accede al namespace de Bootstrap

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showToolbar = true;
  userId: string | null = '';
  previousUrl: string | null = null;
  userModel = new User('', '', '', '', '', '', '', '', 0);
  @ViewChild('offcanvasSidebar') sidebarRef!: ElementRef;
  offcanvasInstance: any;


  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    // Guardar la última URL antes de cada navegación
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!event.url.includes('/login')) {
          sessionStorage.setItem('ultimaRuta', event.url);
        }

        // Mostrar/ocultar toolbar
        this.showToolbar = !(event.url === '/' || event.url.includes('/login') || (this.userId === '' || this.userId === null));
      });

    // Guardar la URL anterior (por si se quiere usar en otros contextos)
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationStart => event instanceof NavigationStart),
        pairwise()
      )
      .subscribe(([prev, curr]: [NavigationStart, NavigationStart]) => {
        this.previousUrl = prev.url;
      });

    // Verificar sesión y restaurar
    this.userId = localStorage.getItem('id_user');

    if (this.userId === '' || this.userId === null) {
      console.log('No se encontró id_user en localStorage');
    } else {
      this.adminService.startSessionTimer2();
      console.log('Sesión activa, id_user:', this.userId);
      this.obtenerDatosUsuario(this.userId);

      const ultimaRuta = sessionStorage.getItem('ultimaRuta');
      if (ultimaRuta && ultimaRuta !== '/') {
        this.router.navigateByUrl(ultimaRuta);
      } else {
        this.router.navigate(['/lista-blogs']); // Ruta por defecto si no hay ruta previa
      }
    }
  }

  ngAfterViewInit(): void {
    this.offcanvasInstance = new bootstrap.Offcanvas(this.sidebarRef.nativeElement);
  }

   closeSidebar() {
    if (this.offcanvasInstance) {
      this.offcanvasInstance.hide();
    }
  }

  obtenerDatosUsuario(id_user: string | number) {
    this.adminService.getUserUP(id_user).subscribe(
      (userModel: User) => this.userModel = userModel
    );
  }

  logout() {
    this.adminService.logout().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.snackBar.open('Sesión Finalizada', 'Cerrar', { duration: 3000 });
          sessionStorage.removeItem('id_user');
          sessionStorage.removeItem('ultimaRuta'); // Limpiar la ruta guardada
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al cerrar sesión', error);
      }
    );
  }
}
