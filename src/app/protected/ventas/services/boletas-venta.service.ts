import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BoletaVenta } from '../interfaces/boleta-venta-interface';

@Injectable({
  providedIn: 'root',
})
export class BoletasVentaService {
  //PROPIEDADES
  private baseUrl = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getAll(): Observable<BoletaVenta[]> {
    return this.http.get<BoletaVenta[]>(`${this.baseUrl}/api/ventas`);
  }

  anular(id: number): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/api/ventas/${id}/anular`, {})
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
