import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../../services/proveedores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styles: [],
})
export class ProveedorListComponent implements OnInit {
  // PROPIEDADES
  proveedores: Proveedor[] = [];

  paginador: any;
  urlPagina: string = '/dashboard/consignaciones/marcas/page/';

  proveedor: Proveedor = {
    id: 0,
    ruc: '',
    razonComercial: '',
    email: '',
    direccion: '',
    telefono: '',
    eliminado: false,
  };
  // CONSTRUCTOR
  constructor(
    private proveedorService: ProveedoresService,
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

      this.proveedorService.getAllPaginatation(page).subscribe((response) => {
        this.proveedores = response.content;
        this.paginador = response;

        console.log('this.proveedores', this.proveedores);
        console.log('this.paginador', this.paginador);
      });
    });
  }

  listar(): void {
    this.proveedorService.getAll().subscribe((response) => {
      this.proveedores = response;
    });
  }

  eliminar(id: number): void {
    this.proveedorService.delete(id).subscribe((response) => {
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Proveedor eliminado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.listarYPaginar();
    });
  }

  asignarProveedor(proveedor: Proveedor): void {
    this.proveedor = proveedor;
  }
}
