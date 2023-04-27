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

export interface Marca {
  id: number;
  nombre: string;
  eliminado: boolean;
}

export interface Proveedor {
  id: number;
  ruc: string;
  razonComercial: string;
  direccion: string;
  telefono: string;
  eliminado: boolean;
}
