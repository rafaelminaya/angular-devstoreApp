export interface KardexPorProducto {
  id: number;
  saldoTotal: number;
  entradaTotal: number;
  salidaTotal: number;
  entradaPrecio: number;
  salidaPrecio: number;
  tipoOperacion: string;
  numero: string;
  fechaEmision: Date;
  saldoCantidad: number;
  entradaCantidad: number;
  salidaCantidad: number;
  saldoPrecio: number;
  productoId: number;
}
