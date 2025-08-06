import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { domain } from '../classes/globals';
import { HeaderGlobal, HeaderMenu, HeaderSubmenu } from '../classes/header';
import { FooterGlobal, FooterEncabezados, FooterEnlaces, FooterLastOrdenEnlaces } from '../classes/footer';
import { GaleriaGlobal, GaleriaContent } from '../classes/galeria';
import { HttpRequest } from '@angular/common/http';
import { ScriptsBody, ScriptsHead } from '../classes/scripts_bd';


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
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/header-global/${id}?_method=PUT`, formData).pipe(
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
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/header-menu/${id}?_method=PUT`, formData).pipe(
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
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/header-submenu/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }


  deleteHeaderSubmenu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/header-submenu/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Conf FooterGlobal
  getFooterGlobal(): Observable<FooterGlobal[]> {
    return this.http.get<FooterGlobal[]>(`${this.baseUrl}/footer-global`).pipe(
      catchError(this.handleError)
    );
  }

  getFooterGlobalId(id: number): Observable<FooterGlobal> {
    return this.http.get<{ success: boolean; data: FooterGlobal }>(`${this.baseUrl}/footer-global/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createFooterGlobal(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/footer-global`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateFooterGlobal(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/footer-global/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteFooterGlobal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/footer-global/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Conf FooterEncabezado
  getFooterEncabezado(): Observable<FooterEncabezados[]> {
    return this.http.get<FooterEncabezados[]>(`${this.baseUrl}/footer-encabezado`).pipe(
      catchError(this.handleError)
    );
  }

  getFooterEncabezadoId(id: number): Observable<FooterEncabezados> {
    return this.http.get<{ success: boolean; data: FooterEncabezados }>(`${this.baseUrl}/footer-encabezado/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createFooterEncabezado(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/footer-encabezado`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateFooterEncabezado(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/footer-encabezado/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteFooterEncabezado(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/footer-encabezado/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Conf FooterEnlaces
  getFooterEnlaces(): Observable<FooterEnlaces[]> {
    return this.http.get<FooterEnlaces[]>(`${this.baseUrl}/footer-enlaces`).pipe(
      catchError(this.handleError)
    );
  }

  getLastOrdenEnlaces(id: number): Observable<FooterLastOrdenEnlaces> {
    return this.http.get<FooterLastOrdenEnlaces>(`${this.baseUrl}/get-views/getLastOrdenEnlaces/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getFooterEnlacesId(id: number): Observable<FooterEnlaces> {
    return this.http.get<{ success: boolean; data: FooterEnlaces }>(`${this.baseUrl}/footer-enlaces/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createFooterEnlaces(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/footer-enlaces`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateFooterEnlaces(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/footer-enlaces/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteFooterEnlaces(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/footer-enlaces/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //GALERIA GLOBAL
  getGaleriaGlobal(): Observable<GaleriaGlobal[]> {
    return this.http.get<GaleriaGlobal[]>(`${this.baseUrl}/galeria-global`).pipe(
      catchError(this.handleError)
    );
  }

  // getLastOrdenGaleriaGlobal(id: number): Observable<GaleriaGlobal> {
  //   return this.http.get<GaleriaGlobal>(`${this.baseUrl}/get-views/getLastOrdenEnlaces/${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getGaleriaGlobalId(id: number): Observable<GaleriaGlobal> {
    return this.http.get<{ success: boolean; data: GaleriaGlobal }>(`${this.baseUrl}/galeria-global/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createGaleriaGlobal(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/galeria-global`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateGaleriaGlobal(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/galeria-global/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteGaleriaGlobal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/galeria-global/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // GALERIA CONTENT
  getGaleriaContent(): Observable<GaleriaContent[]> {
    return this.http.get<GaleriaContent[]>(`${this.baseUrl}/galeria-content`).pipe(
      catchError(this.handleError)
    );
  }

  // getLastOrdenGaleriaGlobal(id: number): Observable<GaleriaGlobal> {
  //   return this.http.get<GaleriaGlobal>(`${this.baseUrl}/get-views/getLastOrdenEnlaces/${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getGaleriaContentId(id: number): Observable<GaleriaContent> {
    return this.http.get<{ success: boolean; data: GaleriaContent }>(`${this.baseUrl}/galeria-content/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createGaleriaContent(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/galeria-content`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateGaleriaContent(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/galeria-content/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteGaleriaContent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/galeria-content/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  //Scripts Terceros CRUD 
  getScriptsHead(): Observable<ScriptsHead[]> {
    return this.http.get<ScriptsHead[]>(`${this.baseUrl}/script-head`).pipe(
      catchError(this.handleError)
    );
  }

  getScriptsBody(): Observable<ScriptsBody[]> {
    return this.http.get<ScriptsBody[]>(`${this.baseUrl}/script-body`).pipe(
      catchError(this.handleError)
    );
  }

  getScriptHeadParticular(opcion: number): Observable<ScriptsHead> {
    return this.http.get<{ success: boolean; data: ScriptsHead }>(`${this.baseUrl}/script-head/${opcion}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getScriptBodyParticular(opcion: number): Observable<ScriptsBody> {
    return this.http.get<{ success: boolean; data: ScriptsBody }>(`${this.baseUrl}/script-body/${opcion}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  createScriptHead(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/script-head`, formData).pipe(
      catchError(this.handleError)
    );
  }

  createScriptBody(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/script-body`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateScriptHead(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/script-head/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateScriptBody(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // override para el backend PHP
    return this.http.post(`${this.baseUrl}/script-body/${id}?_method=PUT`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteScriptHead(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/script-head/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteScriptBody(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/script-body/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
  }
}