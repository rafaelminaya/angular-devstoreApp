import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KardexPorProducto } from '../interfaces/kardex-por-producto.interface';
import { LiquidacionProveedores } from '../interfaces/liquidacion-proveedores.interace';
import { RegistroVentas } from '../interfaces/registro-ventas.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  // ATRIBUTOS
  private baseUrl: string = environment.baseUrl;
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  // MÉTODOS
  getRegistroVentas(): Observable<RegistroVentas[]> {
    return this.http.get<RegistroVentas[]>(
      `${this.baseUrl}/api/reportes/ventas`,
      {}
    );
  }

  getKardexProducto(): Observable<KardexPorProducto[]> {
    return this.http.get<KardexPorProducto[]>(
      `${this.baseUrl}/api/reportes/kardex-producto`
    );
  }

  getLiquidacionProveedores(): Observable<LiquidacionProveedores[]> {
    return this.http.get<LiquidacionProveedores[]>(
      `${this.baseUrl}/api/reportes/liquidacion-proveedores`
    );
  }
}
