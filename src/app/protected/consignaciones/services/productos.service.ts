import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BackendResponse } from '../../interfaces/backend-response.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  //PROPIEDADES
  private baseUrl = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getAllPaginatation(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/productos/page/${page}`);
  }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/api/productos`);
  }

  get(id: string | number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/api/productos/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('err.error.mensaje', err.error.mensaje);
        console.log('err.error.mensaje', err.error.errors);

        Swal.fire({
          position: 'top-right',
          icon: 'info',
          title: err.error.mensaje || err.error.errors,
          showConfirmButton: false,
          timer: 5000,
          toast: true,
        });
        return throwError(() => err);
      })
    );
  }

  getAllByMarcaId(marcaId: number): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(`${this.baseUrl}/api/productos/${marcaId}/by-marca`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err.error.mensaje', err.error.mensaje);
          console.log('err.error.mensaje', err.error.errors);

          Swal.fire({
            position: 'top-right',
            icon: 'info',
            title: err.error.mensaje || err.error.errors,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
          });
          return throwError(() => err);
        })
      );
  }

  getAllByFiltroVenta(termino: string): Observable<Producto[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('termino', termino);

    return this.http
      .get<Producto[]>(`${this.baseUrl}/api/productos/by-filtro-venta`, {
        params: searchParams,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err.error.mensaje', err.error.mensaje);
          console.log('err.error.mensaje', err.error.errors);

          Swal.fire({
            position: 'top-right',
            icon: 'info',
            title: err.error.mensaje || err.error.errors,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
          });
          return throwError(() => err);
        })
      );
  }

  add(producto: Producto): Observable<BackendResponse> {
    return this.http
      .post<BackendResponse>(`${this.baseUrl}/api/productos`, producto)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err.error.mensaje', err.error.mensaje);
          console.log('err.error.mensaje', err.error.errors);

          Swal.fire({
            position: 'top-right',
            icon: 'info',
            title: err.error.mensaje || err.error.errors,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
          });

          return throwError(() => err);
        })
      );
  }

  update(id: string | number, producto: Producto): Observable<BackendResponse> {
    return this.http
      .put<BackendResponse>(`${this.baseUrl}/api/productos/${id}`, producto)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err.error.mensaje', err.error.mensaje);
          console.log('err.error.mensaje', err.error.errors);

          Swal.fire({
            position: 'top-right',
            icon: 'info',
            title: err.error.mensaje || err.error.errors,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
          });

          return throwError(() => err);
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/api/consignaciones/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err.error.mensaje', err.error.mensaje);
          console.log('err.error.mensaje', err.error.errors);

          Swal.fire({
            position: 'top-right',
            icon: 'info',
            title: err.error.mensaje || err.error.errors,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
          });
          // return of(err.error.mensaje);
          return throwError(() => err);
        })
      );
  }
}
