import { Marca } from './marca.interface';

export interface Producto {
  id: number;
  codigo?: string;
  nombre?: string;
  talla?: string;
  color?: string;
  precioCompra?: number;
  precioVenta?: number;
  stock?: number;
  eliminado?: boolean;
  marca?: Marca;
  cadenaProducto?: string;
}

export interface ProductoByMarca {
  productoId: number;
  producto: Producto;
  cadenaProducto: string;
}
