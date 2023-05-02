import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoletaVenta } from '../../../interfaces/boleta-venta-interface';
import { BoletasVentaService } from '../../../services/boletas-venta.service';

@Component({
  selector: 'app-boleta-venta-edit',
  templateUrl: './boleta-venta-edit.component.html',
  styles: [],
})
export class BoletaVentaEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  boletaVenta!: BoletaVenta;
  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private boletasVentaService: BoletasVentaService
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.obtenerBoletaVenta();
  }

  obtenerBoletaVenta() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.boletasVentaService.get(id).subscribe((boletaVenta) => {
        this.boletaVenta = boletaVenta;
      });
    });
  }
}
