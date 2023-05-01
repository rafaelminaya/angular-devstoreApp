import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BackendResponse } from '../../interfaces/backend-response.interface';
import { GuiaRemision } from '../interfaces/guia-remision.interface';

@Injectable({
  providedIn: 'root',
})
export class GuiasRemisionService {
  // ATRIBUTOS
  private baseUrl: string = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getAll(): Observable<GuiaRemision[]> {
    return this.http.get<GuiaRemision[]>(`${this.baseUrl}/api/consignaciones`);
  }

  add(guiaRemision: GuiaRemision): Observable<BackendResponse> {
    return this.http
      .post<BackendResponse>(`${this.baseUrl}/api/consignaciones`, guiaRemision)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err.error.mensaje', err.error.mensaje);
          console.log('err.error.Xmensaje', err.error.errors);

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
