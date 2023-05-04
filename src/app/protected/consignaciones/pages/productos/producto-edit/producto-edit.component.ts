import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styles: [],
})
export class ProductoEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  producto!: Producto;

  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.productosService.get(id).subscribe((producto) => {
        this.producto = producto;
      });
    });
  }

  submit(producto: Producto): void {
    this.productosService.update(this.id, producto).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Producto editado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.router.navigate(['/dashboard/consignaciones/productos']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/productos']);
  }
}
