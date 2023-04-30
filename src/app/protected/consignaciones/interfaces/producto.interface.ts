import { Marca } from './marca.interface';

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  talla: string;
  color: string;
  precioCompra: number;
  precioVenta: number;
  eliminado: boolean;
  marca: Marca;
}
