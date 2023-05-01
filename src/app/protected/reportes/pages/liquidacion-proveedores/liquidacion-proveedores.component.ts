import { Component, OnInit } from '@angular/core';
import { LiquidacionProveedores } from '../../interfaces/liquidacion-proveedores.interace';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { Proveedor } from 'src/app/protected/consignaciones/interfaces/proveedor.interface';
import { ProveedoresService } from '../../../consignaciones/services/proveedores.service';

@Component({
  selector: 'app-liquidacion-proveedores',
  templateUrl: './liquidacion-proveedores.component.html',
  styles: [],
})
export class LiquidacionProveedoresComponent implements OnInit {
  // PROPIEDADES
  reporte: LiquidacionProveedores[] = [];
  proveedores: Proveedor[] = [];

  formReporte: FormGroup = this.fb.group({
    proveedorId: [, Validators.required],
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
  });
  // CONSTRUCTOR
  constructor(
    private proveedoresService: ProveedoresService,
    private reportesService: ReportesService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores() {
    this.proveedoresService.getAll().subscribe((response) => {
      this.proveedores = response;
    });
  }

  submitFormulario(): void {
    if (this.formReporte.invalid) {
      this.formReporte.markAllAsTouched();
      return;
    }

    let proveedorId: string = this.formReporte.value.proveedorId;
    let fechaInicio: string = this.formReporte.value.fechaInicio;
    let fechaFin: string = this.formReporte.value.fechaFin;

    this.reportesService
      .getLiquidacionProveedores(proveedorId, fechaInicio, fechaFin)
      .subscribe((response) => {
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
