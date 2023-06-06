import { Producto } from '../../consignaciones/interfaces/producto.interface';
import { Cliente } from './cliente.interface';

export interface BoletaVenta {
  id?: number;
  numero: string;
  fechaEmision?: Date;
  baseImponible?: number;
  importeIgv?: number;
  total?: number;
  eliminado?: boolean;
  cliente: Cliente;
  boletaVentaDetalles: BoletaVentaDetalle[];
}

export interface BoletaVentaDetalle {
  id?: number;
  cantidad: number;
  precioCompra?: number;
  precioVenta?: number;
  baseImponible?: number;
  importeIgv?: number;
  totalDetalle?: number;
  eliminado?: boolean;
  producto: Producto;
}
