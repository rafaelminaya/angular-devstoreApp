import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  BoletaVenta,
  BoletaVentaDetalle,
} from '../../../interfaces/boleta-venta-interface';
import { BoletasVentaService } from '../../../services/boletas-venta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boleta-venta-list',
  templateUrl: './boleta-venta-list.component.html',
  styles: [],
})
export class BoletaVentaListComponent implements OnInit {
  //PROPIEDADES
  boletaVentaDetalles: BoletaVentaDetalle[] = [];
  boletasVenta: BoletaVenta[] = [];
  paginador: any;
  urlPagina: string = '/dashboard/consignaciones/marcas/page/';

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
  constructor(
    private boletasVentaService: BoletasVentaService,
    private activatedRoute: ActivatedRoute
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listarYPaginar();
  }

  listarYPaginar(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page')!;

      //Validación para la primera página, para cuando no haya este parámetro se le asigne el valor de cero "0".
      if (!page) {
        page = 0;
      }

      this.boletasVentaService
        .getAllPaginatation(page)
        .subscribe((response) => {
          this.boletasVenta = response.content;
          this.paginador = response;

          console.log('this.boletasVenta', this.boletasVenta);
          console.log('this.paginador', this.paginador);
        });
    });
  }

  listar(): void {
    this.boletasVentaService.getAll().subscribe((response) => {
      this.boletasVenta = response;
      console.log(this.boletasVenta);
    });
  }

  anular(id: number): void {
    this.boletasVentaService.anular(id).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Anulado con éxito.',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });

      this.listarYPaginar();
    });
  }

  asignarBoleta(boletaVenta: BoletaVenta): void {
    console.log('boletaVenta', boletaVenta);
    this.boletaVenta = boletaVenta;
  }
}
