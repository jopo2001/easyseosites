import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { domain } from '../classes/globals';
import { LP_EN, LP_ES } from '../classes/landingPage';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public domain = domain;

  private sessionTimerSubscription: Subscription | undefined;

  private baseUrl = this.domain + '/phpCon/'
  //private baseUrl = 'https://test.stormcatcher.com.mx/blog/conex'

  constructor(private http: HttpClient) { }


  /*Login */
  login(correo: string, password: string): Observable<any> {
    //console.log('Mandaste a: ', correo ,' y a pass: ', password);
    return this.http.get<any[]>(`${this.baseUrl}/login.php?correo=${correo}&password=${password}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('id_user'); // Elimina el usuario de localStorage
    return this.http.get<any[]>(`${this.baseUrl}/logout.php`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUserUP(id_user: string | number): Observable<any> { //opcion 15
    return this.http.get(`${this.baseUrl}/login.php?id_user=${id_user}&opcion=2`).pipe(
      map((response: any) => {
        // Puedes realizar cualquier procesamiento adicional aquí si es necesario
        return response;
      })
    );
  }



  startSessionTimer2(): void {
    //console.log('INICIO TEMPORIZADOR')
    // Duración de la sesión en milisegundos (1 hora)
    const sessionDuration = 3600000; // 1 hora en milisegundos

    // Cancelar el temporizador anterior si existe
    this.cancelSessionTimer();

    // Iniciar el temporizador
    this.sessionTimerSubscription = timer(sessionDuration).pipe(
      switchMap(() => this.logout())
    ).subscribe(
      () => {
        this.handleLogout();
      },
      (error) => {
        console.error('Error en la solicitud de cierre de sesión', error);
      }
    );
  }

  cancelSessionTimer(): void {
    // Cancelar el temporizador si existe una suscripción activa
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }



  getBlogs(opcion: number): Observable<any[]> {
    console.log('Iniciando solicitud a la base de datos...', opcion);
    return this.http.get<any[]>(`${this.baseUrl}/confGral.php?opcion=${opcion}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLastBlog(opcion: number): Observable<any> { 
    return this.http.get<any[]>(`${this.baseUrl}/confGral.php?opcion=${opcion}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteBlog(blog: LP_ES, opcion: number) { //3
    console.log('Eliminando registro de la base de datos...');
    console.log('Los datos son: ', blog)
    return this.http.delete(`${this.baseUrl}/confGral.php?opcion=${opcion}&id=${blog.id}&url=${blog.url}`);
  }

  getBlogUP(opcion: number | string, id: string | number | null): Observable<any> {
    //console.log('Obteniendo datos del modelo: ...', id_modelo, ' getModeloUpC');
    return this.http.get<any[]>(`${this.baseUrl}/confGral.php?opcion=${opcion}&id=${id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getBlogUPEN(id: string | number | null): Observable<any> {
    console.log('Mandando ID: ', id)
    return this.http.get<any[]>(`${this.baseUrl}/confGral.php?opcion=11&id=${id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateBlog(opcion: string | number, blogModel: LP_ES, urlNew: string): Observable<any> {
    console.log('Mandando Datos: ', blogModel)

    const url = `${this.baseUrl}/confGral.php?opcion=${opcion}&urlNew=${urlNew}`; 
    const data = {
      blogModel: JSON.stringify(blogModel)
    };
    return this.http.post(url, data); //pasamos la url del php y el cuerpo del json
  }

  deleteIMG(nombre: string, opcion: number, id: number) { 
    console.log('Eliminando registro de la base de datos...');
    console.log('Los datos son: ', nombre)
    return this.http.delete(`${this.baseUrl}/confGral.php?opcion=${opcion}&id=${id}&opt=1&img=${nombre}`);
  }

  deletePortada(nombre: string, opcion: number, id: number) { 
    console.log('Eliminando registro de la base de datos...');
    console.log('Los datos son: ', nombre)
    return this.http.delete(`${this.baseUrl}/confGral.php?opcion=${opcion}&id=${id}&opt=2&portada=${nombre}`);
  }


  updateIMG(opcion: number, blogModel: LP_ES, formData: FormData): Observable<any> {
    console.log('Entrando a IMG en la base de datos...', blogModel);
    console.log('Opcion 7: ', opcion)

    const url = `${this.baseUrl}/confGral.php?opcion=${opcion}&opt=1`;

    formData.append('blogModel', JSON.stringify(blogModel));

    return this.http.post(url, formData);
  }

  updatePortada(opcion: number, blogModel: LP_ES, formData: FormData): Observable<any> {
    console.log('Entrando a portada en la base de datos...', blogModel);
    console.log('Opcion 7: ', opcion)

    const url = `${this.baseUrl}/confGral.php?opcion=${opcion}&opt=2`;

    formData.append('blogModel', JSON.stringify(blogModel));

    return this.http.post(url, formData);
  }

  addBlog(opcion: number, blogModel: LP_ES, formData: FormData): Observable<any> {
    console.log('Creando Blog en la base de datos...', blogModel);
    console.log('Eleeccion: ', opcion)

    const url = `${this.baseUrl}/confGral.php?opcion=${opcion}`;

    formData.append('blogModel', JSON.stringify(blogModel));
    return this.http.post(url, formData);
  }

  // Obtener lista de imágenes en la carpeta blogs (sin BD)
  getGaleriaImagenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/galeria.php`).pipe(
      catchError(this.handleError)
    );
  }


  //Traduccion de blogs
  getBlogTraducciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/confGral.php?opcion=9`);
  }

  guardarBlogEN(blogModel: LP_EN): Observable<any> {
    console.log('Mandando datos a end point: ', blogModel)
    const url = `${this.baseUrl}/confGral.php?opcion=10`;
    const data = {
      blogModelEN: JSON.stringify(blogModel)  // Este nombre debe coincidir con el PHP
    };
    return this.http.post(url, data);
  }


  /*Configuración de header para Easy Seo SItes */

  



  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
  }
  private handleLogout(): void {
    // Manejo adicional después de cerrar sesión (si es necesario)
    localStorage.removeItem('id_user'); // Elimina el usuario de localStorage
    //this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    window.location.href = '/login';

  }

}