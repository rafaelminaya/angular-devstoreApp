export interface LiquidacionProveedores {
    productoId:         number;
    productoTalla:      string;
    boletaNumero:       string;
    boletaId:           number;
    marcaNombre:        string;
    productoNombre:     string;
    productoColor:      string;
    productoCodigo:     string;
    boletaCantidad:     number;
    boletaFechaEmision: Date;
    boletaPrecioCompra: number;
    boletaPrecioVenta:  number;
    boletaPrecioNeto:   number;
}
