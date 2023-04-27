import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GuiaRemision } from '../interfaces/guia-remision.interface';
import Swal from 'sweetalert2';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class GuiasRemisionService {
  // ATRIBUTOS
  private baseUrl: string = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getGuiasRemision(): Observable<GuiaRemision[]> {
    return this.http.get<GuiaRemision[]>(`${this.baseUrl}/api/consignaciones`);
  }

  eliminarGuiaRemision(id: number): Observable<any> {
    return this.http
      .patch<any>(`${this.baseUrl}/api/consignaciones/${id}`, {})
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
