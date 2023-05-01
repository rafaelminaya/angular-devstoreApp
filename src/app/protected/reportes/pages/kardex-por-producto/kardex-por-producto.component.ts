import { Component, OnInit } from '@angular/core';
import { KardexPorProducto } from '../../interfaces/kardex-por-producto.interface';
import { Producto } from 'src/app/protected/consignaciones/interfaces/producto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../consignaciones/services/productos.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-kardex-por-producto',
  templateUrl: './kardex-por-producto.component.html',
  styles: [],
})
export class KardexPorProductoComponent implements OnInit {
  // PROPIEDADES
  reporte: KardexPorProducto[] = [];
  productos: Producto[] = [];

  formReporte: FormGroup = this.fb.group({
    productoId: [, Validators.required],
  });

  // CONSTRUCTOR
  constructor(
    private productosService: ProductosService,
    private reportesService: ReportesService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productosService.getAll().subscribe((response) => {
      this.productos = response;
    });
  }

  submitFormulario(): void {
    if (this.formReporte.invalid) {
      this.formReporte.markAllAsTouched();
      return;
    }

    let productoId: string = this.formReporte.value.productoId;

    this.reportesService.getKardexProducto(productoId).subscribe((response) => {
      this.reporte = response;
    });
  }

  campoNoValido(campo: string) {
    return (
      this.formReporte.get(campo)?.invalid &&
      this.formReporte.get(campo)?.touched
    );
  }
}
