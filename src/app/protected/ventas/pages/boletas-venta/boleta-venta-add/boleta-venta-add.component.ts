import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BoletaVenta } from '../../../interfaces/boleta-venta-interface';
import { BoletasVentaService } from '../../../services/boletas-venta.service';

@Component({
  selector: 'app-boleta-venta-add',
  templateUrl: './boleta-venta-add.component.html',
  styles: [],
})
export class BoletaVentaAddComponent implements OnInit {
  // CONSTRUCTOR
  constructor(
    private boletasVentaService: BoletasVentaService,
    private router: Router
  ) {}

  // MÉTODOS
  ngOnInit(): void {}

  submit(boletaVenta: BoletaVenta): void {
    this.boletasVentaService.add(boletaVenta).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Marca creada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      //this.formMarca.reset();
      this.router.navigate(['/dashboard/ventas/boletas-venta']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/ventas/boletas-venta']);
  }
}
