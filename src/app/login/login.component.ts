import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  email: string = '';
  password: string = '';
  error: string = '';

  @ViewChild('correo') correoInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;


  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,

  ) { 

  }

  ngOnInit(): void { 
  }

  login() {
    //console.log('Entraste');
    //this.router.navigate(['/home']);
    if(this.email!='' && this.password!=''){
    this.adminService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.status === 'success') {
          // Guardar el estado de sesión
          localStorage.setItem('id_user', response.id_user);
          console.log('El id del usuario es: ', response.id_user);
          //this.autosService.startSessionTimer2(); // Inicia el temporizador de sesión
          //console.log('Se supone que se ejecuto startsessin')      
          this.snackBar.open('Sesión Iniciada Exitosamente', 'Cerrar', { duration: 3000 });
          //this.router.navigate(['/home']);
          window.location.href = '/home';

        } else {
          this.snackBar.open('Error al Iniciar Sesión', 'Cerrar', { duration: 3000 });
          this.error = response.message;
        }
      },
      (error) => {
        this.error = 'Error en la solicitud de inicio de sesión';
      }
    );
  } else{
    this.snackBar.open('Rellena los campos solicitados', 'Cerrar', { duration: 3000 });
    //this.correoInput.nativeElement.style.border = '2px solid red';
    //this.passwordInput.nativeElement.style.border = '2px solid red';

  }

}
}

