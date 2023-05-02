import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BackendResponse } from '../../interfaces/backend-response.interface';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  //PROPIEDADES
  private baseUrl = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/api/clientes`);
  }

  get(id: string | number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/api/clientes/${id}`).pipe(
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

  add(cliente: Cliente): Observable<BackendResponse> {
    return this.http
      .post<BackendResponse>(`${this.baseUrl}/api/clientes`, cliente)
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

  update(id: string | number, cliente: Cliente): Observable<BackendResponse> {
    return this.http
      .put<BackendResponse>(`${this.baseUrl}/api/clientes/${id}`, cliente)
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
    return this.http.delete<any>(`${this.baseUrl}/api/clientes/${id}`).pipe(
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
