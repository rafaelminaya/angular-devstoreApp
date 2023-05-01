import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BackendResponse } from '../../interfaces/backend-response.interface';
import { Marca } from '../interfaces/marca.interface';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  //PROPIEDADES
  private baseUrl = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.baseUrl}/api/marcas`);
  }

  add(marca: Marca): Observable<BackendResponse> {
    return this.http
      .post<BackendResponse>(`${this.baseUrl}/api/marcas`, marca)
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
    return this.http.delete<any>(`${this.baseUrl}/api/marcas/${id}`).pipe(
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
