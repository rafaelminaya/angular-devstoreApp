import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductosService } from '../../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styles: [],
})
export class ProductoListComponent implements OnInit {
  // PROPIEDADES
  productos: Producto[] = [];
  paginador: any;
  urlPagina: string = '/dashboard/consignaciones/productos/page/';

  producto: Producto = {
    id: 0,
    codigo: '',
    nombre: '',
    talla: '',
    color: '',
    precioCompra: 0,
    precioVenta: 0,
    eliminado: false,
    marca: {
      id: 0,
      nombre: '',
      eliminado: false,
    },
    cadenaProducto: '',
  };
  // CONSTRUCTOR
  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute
  ) {}
  // MÉTDOOS
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

      this.productosService.getAllPaginatation(page).subscribe((response) => {
        this.productos = response.content;
        this.paginador = response;

        console.log('this.marcas', this.productos);
        console.log('this.paginador', this.paginador);
      });
    });
  }

  listar(): void {
    this.productosService.getAll().subscribe((response) => {
      this.productos = response;
    });
  }

  eliminar(id: number): void {
    this.productosService.delete(id).subscribe((response) => {
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Eliminado con éxito.',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });

      this.listarYPaginar();
    });
  }

  asignarProducto(guia: Producto): void {
    this.producto = guia;
  }
}
