import { Producto } from '../../consignaciones/interfaces/guia-remision.interface';

export interface BoletaVenta {
  id: number;
  numero: string;
  fechaEmision: Date;
  eliminado: boolean;
  cliente: Cliente;
  boletaVentaDetalles: BoletaVentaDetalle[];
  importeIgv: number;
  baseImponible: number;
  total: number;
}

export interface BoletaVentaDetalle {
  id: number;
  cantidad: number;
  precioCompra: number;
  precioVenta: number;
  eliminado: boolean;
  producto: Producto;
  importeIgv: number;
  baseImponible: number;
  totalDetalle: number;
}

export interface Cliente {
  dni: string;
  nombre: string;
  direccion: string;
  telefono: string;
  eliminado: boolean;
  id: number;
}
