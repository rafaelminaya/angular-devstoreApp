import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { Producto } from 'src/app/protected/consignaciones/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../../consignaciones/services/productos.service';
import { BoletasVentaService } from '../../../services/boletas-venta.service';
import {
  BoletaVenta,
  BoletaVentaDetalle,
} from '../../../interfaces/boleta-venta-interface';
import { Cliente } from '../../../interfaces/cliente.interface';

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
  productosSeleccionados: Producto[] = [];
  cliente: Cliente = {
    numeroDocumento: '',
    nombre: '',
    direccion: '',
  };

  boletaVenta: BoletaVenta = {
    numero: '',
    cliente: this.cliente,
    boletaVentaDetalles: [],
  };

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

  formDetalle: FormGroup = this.fb.group({
    producto: ['', [Validators.required]],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precioVenta: [1, [Validators.required, Validators.min(1)]],
  });

  detalles: BoletaVentaDetalle[] = [];

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

  // método lanzado al manipular la cantidad de productos en cada item
  actualizarCantidad(productoId: number, event: any): void {
    // Obtebemos el valor del event, ene este caso el de la caja de texto
    let cantidad: number = event.target.value as number;
    // OPCIONARL - Eliminamos el item en caso la cantidad baje a cero
    if (cantidad == 0) {
      // this.eliminarDetalle(productoId);
    }

    // asginamos a los items, estos mismos items, manipulados por la función "map()" de JS
    this.detalles = this.detalles.map((detalle: BoletaVentaDetalle) => {
      // Si el parámetro "productoId" coincide con algún "id" de entre los "detalles" actuales le asignamos la cantidad de la caja de texto
      if (productoId === detalle.producto.id) {
        detalle.cantidad = cantidad;
      }
      // Devolvemos el item con la nueva cantidad asignada, así actualiza el importe
      return detalle;
    });
    console.log('items', this.detalles);
  }

  actualizarPrecioVenta(productoId: number, event: any): void {}

  eliminarDetalle(producto: Producto) {
    console.log('producto', producto);
    // re asignamos los items, con el método "filter()" de JS, todos aquellos que no coincidan con el parámetro "productoId"
    this.detalles = this.detalles.filter(
      (item: BoletaVentaDetalle) => item.producto.id !== producto.id
    );
    console.log('this.detalles', this.detalles);
  }

  teclaPresionada() {
    const termino: string = this.txtbuscar.nativeElement.value;

    if (termino.trim().length === 0) {
      return;
    }

    this.debouncer.next(termino);
  }

  existeDetalle(productoId: number): boolean {
    let existe: boolean = false;

    this.detalles.forEach((item: BoletaVentaDetalle) => {
      // comparamos el parámetro con el "id" de productos ya existentes entre los "items"
      if (productoId === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  productoBox(id: number) {
    console.log('evento', id);

    let productoId: number = id;
    // validación de la existencia del mismo producto
    if (this.existeDetalle(productoId)) {
      Swal.fire({
        position: 'top-right',
        icon: 'info',
        title: 'El producto ya estaba agregado.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
      return;
    }

    this.productosService.get(id).subscribe((response) => {
      console.log('productoBox', response);
      /*
      console.log('this.detalles1', this.detalles);

      this.detalles.push(this.formDetalle.value);

      console.log('this.detalles2', this.detalles);

      this.detalles = this.detalles.map((detalle) => {
        if (detalle.producto.id === response.id) {
          detalle.producto.nombre = response.cadenaProducto;
        }
        return detalle;
      });
      */

      this.productosSeleccionados.push(response);

      this.detalles.push({
        // id: 0,
        cantidad: 1,
        // precioCompra: 1,
        // precioVenta: 1,
        // baseImponible: 0,
        // importeIgv: 0,
        // totalDetalle: 0,
        // eliminado: false,
        producto: response,
      });

      /*
      this.detalles.forEach((detalle) => {
        detalle.producto = response;
        detalle.cantidad = 1;
      });

      this.detalles = this.detalles.map((detalle) => {
        if (detalle.producto.id === response.id) {
          detalle.producto.nombre = response.cadenaProducto;
          detalle.cantidad = 1;
        }
        return detalle;
      });
      */
    });
  }

  buscarProductos(termino: string) {
    this.productosService.getAllByFiltroVenta(termino).subscribe((response) => {
      this.productos = response;

      console.log('this.productos', this.productos);
    });
  }

  // YA NO SE USA - AHORA USAMOS "productoBox()"
  buscarProductoSeleccionado(id: number) {
    console.log('id', id);

    this.productosService
      .get(id)
      .subscribe((response) => this.productosSeleccionados.push(response));
  }

  submitForm(): void {
    if (this.formBoletaVenta.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formBoletaVenta.markAllAsTouched();
      return;
    }

    console.log('this.detalles', this.detalles);

    this.detalles.forEach((item) =>
      this.detallesArray.push(this.fb.control(item, Validators.required))
    );

    /*
    this.productosSeleccionados.forEach((item) =>
      this.detallesArray.push(this.fb.control(item, Validators.required))
    );
    */
    // this.cliente.nombre = 'dato1';
    // this.cliente.numeroDocumento = 'dato2';
    // this.cliente.direccion = 'dato2';

    // this.boletaVenta = this.formBoletaVenta.value;

    this.cliente.nombre = this.formBoletaVenta.get('nombre')?.value;
    this.cliente.numeroDocumento =
      this.formBoletaVenta.get('numeroDocumento')?.value;
    this.cliente.direccion = this.formBoletaVenta.get('direccion')?.value;

    this.detalles = this.detalles.map((detalle) => {
      delete detalle.producto.codigo;
      delete detalle.producto.nombre;
      delete detalle.producto.talla;
      delete detalle.producto.color;
      delete detalle.producto.precioCompra;
      delete detalle.producto.precioVenta;
      delete detalle.producto.stock;
      delete detalle.producto.eliminado;
      delete detalle.producto.marca;
      delete detalle.producto.cadenaProducto;
      return detalle;
    });

    this.boletaVenta.numero = this.formBoletaVenta.get('numero')?.value;
    this.boletaVenta.cliente = this.cliente;
    this.boletaVenta.boletaVentaDetalles = this.detalles;

    console.log('this.boletaVenta', this.boletaVenta);

    this.boletasVentaService.add(this.boletaVenta).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Venta realizada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
      window.location.reload();

      // REINICIO DEL FORMULARIO
      /*
      this.productos = [];
      this.detalles = [];
      this.cliente = {
        numeroDocumento: '',
        nombre: '',
        direccion: '',
      };

      this.boletaVenta = {
        numero: '',
        cliente: this.cliente,
        boletaVentaDetalles: [],
      };

      this.txtbuscar.nativeElement.value = '';
      this.txtbuscar.nativeElement.focus();
      this.formBoletaVenta.reset();
      */

      //this.router.navigate(['/dashboard/ventas/boletas-venta/crear']);
    });
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
