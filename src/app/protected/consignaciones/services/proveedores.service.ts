import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Proveedor } from '../interfaces/guia-remision.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  // ATRIBUTOS
  private baseUrl: string = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.baseUrl}/api/proveedores`);
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http
      .patch<any>(`${this.baseUrl}/api/proveedores/${id}`, {})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error', err);
          console.log('err.error', err.error);
          console.log('err.error.mensaje', err.error.mensaje);

          Swal.fire({
            position: 'top-right',
            icon: 'info',
            title: err.error.mensaje,
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
