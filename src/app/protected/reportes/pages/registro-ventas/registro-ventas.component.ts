import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { RegistroVentas } from '../../interfaces/registro-ventas.interface';

@Component({
  selector: 'app-registro-ventas',
  templateUrl: './registro-ventas.component.html',
  styles: [],
})
export class RegistroVentasComponent implements OnInit {
  // PROPIEDADES
  reporte: RegistroVentas[] = [];

  formReporte: FormGroup = this.fb.group({
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
  });

  // CONSTRUCTOR
  constructor(
    private reportesService: ReportesService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitFormulario(): void {
    if (this.formReporte.invalid) {
      this.formReporte.markAllAsTouched();
      return;
    }

    let fechaInicio: string = this.formReporte.value.fechaInicio;
    let fechaFin: string = this.formReporte.value.fechaFin;

    this.reportesService
      .getRegistroVentas(fechaInicio, fechaFin)
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
