import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { domain } from '../classes/globals';
import { HeaderGlobal, HeaderMenu, HeaderSubmenu } from '../classes/header';
import { HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GralService {
  public domain = domain;
  private baseUrl = this.domain + '/api'
  //https://test.itcun.info/api/header-submenu ejemplo de solicitud


  constructor(private http: HttpClient) { }

  /*Configuración de header para Easy Seo Sites Start */

  //Conf header Globals
  getHeaderGlobal(): Observable<HeaderGlobal[]> {
    return this.http.get<HeaderGlobal[]>(`${this.baseUrl}/header-global`).pipe(
      catchError(this.handleError)
    );
  }

  getHeaderGlobalParticular(opcion: number): Observable<HeaderGlobal> {
    return this.http.get<{ success: boolean; data: HeaderGlobal }>(`${this.baseUrl}/header-global/${opcion}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createHeaderGlobal(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/header-global`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateHeaderGlobal(id: number, formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}/header-global/${id}?_method=PUT`, formData);
    return this.http.request(req).pipe(
      catchError(this.handleError)
    );
  }

  deleteHeaderGlobal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/header-global/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  //Conf Menu

  getHeaderMenu(): Observable<HeaderMenu[]> {
    return this.http.get<HeaderMenu[]>(`${this.baseUrl}/header-menu`).pipe(
      catchError(this.handleError)
    );
  }

  getHeaderMenuParticular(opcion: number): Observable<HeaderMenu> {
    return this.http.get<{ success: boolean; data: HeaderMenu }>(`${this.baseUrl}/header-menu/${opcion}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createHeaderMenu(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/header-menu`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateHeaderMenu(id: number, formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}/header-menu/${id}?_method=PUT`, formData);
    return this.http.request(req).pipe(
      catchError(this.handleError)
    );
  }

  deleteHeaderMenu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/header-menu/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Conf submenu
  getHeaderSubmenu(): Observable<HeaderSubmenu[]> {
    return this.http.get<HeaderSubmenu[]>(`${this.baseUrl}/header-submenu`).pipe(
      catchError(this.handleError)
    );
  }

  getHeaderSubmenuParticular(opcion: number): Observable<HeaderSubmenu> {
    return this.http.get<{ success: boolean; data: HeaderSubmenu }>(`${this.baseUrl}/header-submenu/${opcion}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createHeaderSubmenu(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/header-submenu`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateHeaderSubmenu(id: number, formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}/header-submenu/${id}?_method=PUT`, formData);
    return this.http.request(req).pipe(
      catchError(this.handleError)
    );
  }

  deleteHeaderSubmenu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/header-submenu/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  /*Configuración de header para Easy Seo Sites End */







  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
  }
}