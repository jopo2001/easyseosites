import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { domain } from '../classes/globals';
import { HeaderGlobal, HeaderMenu, HeaderSubmenu } from '../classes/header';
import { HttpRequest } from '@angular/common/http';
import { LP_ES } from '../classes/landingPage';


@Injectable({
  providedIn: 'root'
})

export class PageService {
  public domain = domain;
  private baseUrl = this.domain + '/api'
  //https://test.itcun.info/api/header-submenu ejemplo de solicitud


  constructor(private http: HttpClient) { }

  /*Configuración de header para Easy Seo Sites Start */

  //Conf header Globals
  getPageESGlobal(): Observable<LP_ES[]> {
    return this.http.get<LP_ES[]>(`${this.baseUrl}/page-es`).pipe(
      catchError(this.handleError)
    );
  }

  getLPGlobalParticular(opcion: number): Observable<LP_ES> {
    return this.http.get<{ success: boolean; data: LP_ES }>(`${this.baseUrl}/page-es/${opcion}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createPageES(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/page-es`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updatePageES(id: number, formData: FormData): Observable<any> {
  formData.append('_method', 'PUT'); // override para el backend PHP
  return this.http.post(`${this.baseUrl}/page-es/${id}`, formData).pipe(
    catchError(this.handleError)
  );
}

  /*
 updatePageES(id: number, PageEs: LP_ES): Observable<any> {
  console.log('Mandando metodo: ', PageEs)
  const formData = new FormData();
  formData.append('PageEs', JSON.stringify(PageEs));
  formData.append('_method', 'PUT'); // ¡Importante!

  const url = `${this.baseUrl}/page-es/${id}`;
  return this.http.post(url, formData); // POST real
}*/

  deletePageES(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/page-es/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
  }
}