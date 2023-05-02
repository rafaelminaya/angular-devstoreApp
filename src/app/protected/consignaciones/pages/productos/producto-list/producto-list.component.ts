import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductosService } from '../../../services/productos.service';
@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styles: [],
})
export class ProductoListComponent implements OnInit {
  // PROPIEDADES
  productos: Producto[] = [];
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
  };
  // CONSTRUCTOR
  constructor(private productosService: ProductosService) {}
  // MÉTDOOS
  ngOnInit(): void {
    this.listar();
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
    });
  }

  asignarProducto(guia: Producto): void {
    this.producto = guia;
  }
}
