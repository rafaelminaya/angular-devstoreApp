import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BoletaVenta } from '../../../interfaces/boleta-venta-interface';
import { BoletasVentaService } from '../../../services/boletas-venta.service';

@Component({
  selector: 'app-boleta-venta-list',
  templateUrl: './boleta-venta-list.component.html',
  styles: [],
})
export class BoletaVentaListComponent implements OnInit {
  //PROPIEDADES
  boletasVenta: BoletaVenta[] = [];

  boletaVenta: BoletaVenta = {
    id: 0,
    numero: '',
    fechaEmision: new Date(),
    baseImponible: 0,
    importeIgv: 0,
    total: 0,
    eliminado: false,
    cliente: {
      numeroDocumento: '',
      nombre: '',
      direccion: '',
      telefono: '',
      eliminado: false,
      id: 0,
    },
    boletaVentaDetalles: [],
  };
  // CONSTRUCTOR
  constructor(private boletasVentaService: BoletasVentaService) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.boletasVentaService.getAll().subscribe((response) => {
      this.boletasVenta = response;
    });
  }

  anular(id: number): void {
    this.boletasVentaService.anular(id).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Eliminado con éxito.',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    });
  }

  asignarBoleta(boletaVenta: BoletaVenta): void {
    this.boletaVenta = boletaVenta;
  }
}
