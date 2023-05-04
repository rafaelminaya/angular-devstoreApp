import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styles: [],
})
export class ProductoAddComponent implements OnInit {
  // CONSTRUCTOR
  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

  // MÉTDOOS
  ngOnInit(): void {}

  submit(producto: Producto): void {
    this.productosService.add(producto).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Producto creado con éxito.',
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
