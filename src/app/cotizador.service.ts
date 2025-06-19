import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Blog } from './classes/blog';
import { switchMap } from 'rxjs/operators';
import { domain } from './classes/globals';
import { Region } from './classes/cot-regiones';

@Injectable({
  providedIn: 'root'
})

export class CotizadorService {
  public domain = domain;

  private sessionTimerSubscription: Subscription | undefined;

  private baseUrl = this.domain + '/php'

  //private baseUrl = 'https://test.stormcatcher.com.mx/blog/conex'
  //private baseUrl = '../../carhecsol'; //cuando se pase a la nube asi debe quedar

  constructor(private http: HttpClient) { }

  /*Seccion de vistas de cotizador */

  getRegiones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cotizador/consultas.php?accion=regiones`);
  }

  // Agregar una nueva región usando JSON
  agregarRegion(nombre: string): Observable<any> {
    const url = `${this.baseUrl}/cotizador/consultas.php?accion=agregar_region`;
    const data = {
      regionModel: {
        nombre: nombre
      }
    };
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }

  // Editar una región existente
  editarRegion(regionModel: Region): Observable<any> {
    //console.log('Mandando: ', regionModel)

    const url = `${this.baseUrl}/cotizador/consultas.php?accion=editar_region`; // Reemplaza con la ruta correcta de tu API
    const data = {
      regionModel: regionModel
    };
    return this.http.post(url, data); //pasamos la url del php y el cuerpo del json
  }

  // Eliminar una región usando JSON
  eliminarRegion(id: number): Observable<any> {
    const url = `${this.baseUrl}/cotizador/consultas.php?accion=eliminar_region`;
    const data = {
      regionModel: {
        id: id
      }
    };
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }



 // Obtener productos
getProductos(): Observable<any> {
  return this.http.get(`${this.baseUrl}/cotizador/consultas.php?accion=productos`);
}

// Agregar producto
agregarProducto(productoModel: any): Observable<any> {
  console.log('Producto enviardo es: ', productoModel);
  const url = `${this.baseUrl}/cotizador/consultas.php?accion=agregar_producto`;
  return this.http.post(url, { productoModel }).pipe(catchError(this.handleError));
}

// Eliminar producto
eliminarProducto(id: number): Observable<any> {
  const url = `${this.baseUrl}/cotizador/consultas.php?accion=eliminar_producto`;
  return this.http.post(url, { productoModel: { id } }).pipe(catchError(this.handleError));
}

//Obtener un producto para su edicion
getProductoById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/cotizador/consultas.php?accion=producto&id=${id}`);
}

editarProducto(data: any): Observable<any> {
  console.log('Datos: ', data);
  return this.http.post(`${this.baseUrl}/cotizador/consultas.php?accion=editar_producto`, { productoModel: data });
}


  getColores(productoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cotizador/consultas.php?accion=colores&producto_id=${productoId}`);
  }

  getLimites(productoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cotizador/consultas.php?accion=limites&producto_id=${productoId}`);
  }

  getPrecios(regionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cotizador/consultas.php?accion=precios&region_id=${regionId}`);
  }

  guardarPrecio(data: { producto_id: number, region_id: number, precio_m2: number }): Observable<any> {
  return this.http.post(`${this.baseUrl}/cotizador/consultas.php?accion=guardar_precio`, data);
}






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