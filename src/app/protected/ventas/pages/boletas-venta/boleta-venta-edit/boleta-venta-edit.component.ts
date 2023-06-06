import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    private boletasVentaService: BoletasVentaService,
    private router: Router
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

  submit(boletaVenta: BoletaVenta): void {
    this.boletasVentaService
      .anular(this.boletaVenta.id!)
      .subscribe((response) => {
        console.log('response', response);

        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Boleta de venta anulada con éxito.',
          showConfirmButton: false,
          timer: 3500,
          toast: true,
        });

        this.router.navigate(['/dashboard/ventas/boletas-venta']);
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/ventas/boletas-venta']);
  }
}
