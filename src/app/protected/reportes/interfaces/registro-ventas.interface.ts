export interface RegistroVentas {
  id: number;
  importeIgv: number;
  baseImponible: number;
  eliminado: boolean;
  numero: string;
  fechaEmision: Date;
  total: number;
  clienteDni: string;
  clienteId: number;
  clienteNombre: string;
}
