import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { Producto } from 'src/app/protected/consignaciones/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../../consignaciones/services/productos.service';
import { BoletasVentaService } from '../../../services/boletas-venta.service';
import { BoletaVenta } from '../../../interfaces/boleta-venta-interface';

@Component({
  selector: 'app-boleta-venta-add',
  templateUrl: './boleta-venta-add.component.html',
  styles: [
    `
      .info-box {
        cursor: pointer;
      }
    `,
  ],
})
export class BoletaVentaAddComponent implements OnInit {
  // PROPIEDADES
  productos: Producto[] = [];
  prodductosSeleccionados: Producto[] = [];
  boletaVenta!: BoletaVenta;

  // propiedades para la búsqueda de productos
  @ViewChild('txtBuscarProducto')
  txtbuscar!: ElementRef<HTMLInputElement>;
  debouncer: Subject<string> = new Subject();

  formBoletaVenta: FormGroup = this.fb.group({
    numero: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    numeroDocumento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    direccion: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    boletaVentaDetalles: this.fb.array([]),
  });

  get detallesArray() {
    return this.formBoletaVenta.get('boletaVentaDetalles') as FormArray;
  }

  // CONSTRUCTOR
  constructor(
    private boletasVentaService: BoletasVentaService,
    private productosService: ProductosService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((valorTermino) => {
      console.log('debouncer: ', valorTermino);
      // Emitimos el valor obtenido hacia el template por medio de la propiedad/evento "onDebounce".
      this.buscarProductos(valorTermino);
    });
  }

  actualizarCantidad(productoId: number, event: any): void {}

  actualizarPrecioVenta(productoId: number, event: any): void {}

  eliminarDetalle(producto: Producto) {}

  teclaPresionada() {
    const termino: string = this.txtbuscar.nativeElement.value;

    if (termino.trim().length === 0) {
      return;
    }

    this.debouncer.next(termino);
  }

  productoBox(id: number) {
    console.log('evento', id);
    this.productosService
      .get(id)
      .subscribe((response) => this.prodductosSeleccionados.push(response));
  }

  buscarProductos(termino: string) {
    this.productosService.getAllByFiltroVenta(termino).subscribe((response) => {
      this.productos = response;

      console.log('this.productos', this.productos);
    });
  }

  buscarProductoSeleccionado(id: number) {
    console.log('id', id);

    this.productosService
      .get(id)
      .subscribe((response) => this.prodductosSeleccionados.push(response));
  }

  submitForm(): void {
    if (this.formBoletaVenta.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formBoletaVenta.markAllAsTouched();
      return;
    }

    this.prodductosSeleccionados.forEach((item) =>
      this.detallesArray.push(this.fb.control(item, Validators.required))
    );

    this.boletaVenta = this.formBoletaVenta.value;
    console.log('this.boletaVenta', this.boletaVenta);

    /*
    this.boletasVentaService.add(this.boletaVenta).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Marca creada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
    
      this.router.navigate(['/dashboard/ventas/boletas-venta']);

    });
    */
  }

  cancelForm() {
    this.router.navigate(['/dashboard/ventas/boletas-venta']);
  }

  campoNoValido(campo: string) {
    return (
      this.formBoletaVenta.get(campo)?.invalid &&
      this.formBoletaVenta.get(campo)?.touched
    );
  }
}
