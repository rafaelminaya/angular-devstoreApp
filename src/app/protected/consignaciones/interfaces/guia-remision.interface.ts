import { Producto } from './producto.interface';
import { Proveedor } from './proveedor.interface';

export interface GuiaRemision {
  id: number;
  numero: string;
  fechaEmision: Date;
  porcentajeComision: number;
  proveedor: Proveedor;
  guiaRemisionDetalles: GuiaRemisionDetalle[];
  procesado: boolean;
  eliminado: boolean;
  totalPrecioCompra?: number;
  totalPrecioVenta?: number;
  totalImporteComision?: number;
}

export interface GuiaRemisionDetalle {
  id: number;
  cantidad: number;
  precioVenta: number;
  producto: Producto;
  eliminado: boolean;
  precioCompra: number;
  totalDetalle: number;
  porcentajeComision: number;
  importeComision: number;
}
