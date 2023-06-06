import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  GuiaRemision,
  GuiaRemisionDetalle,
} from '../../interfaces/guia-remision.interface';
import { Marca } from '../../interfaces/marca.interface';
import { Producto } from '../../interfaces/producto.interface';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { MarcasService } from '../../services/marcas.service';
import { ProductosService } from '../../services/productos.service';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-guia-remision-form',
  templateUrl: './guia-remision-form.component.html',
  styles: [],
})
export class GuiaRemisionFormComponent implements OnInit {
  // PROPIEDADES
  @Input() labelSubmit = '';
  @Input()
  set model(model: GuiaRemision) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formGuiaRemision.patchValue(model);
    // Asignamos los detalles
    model.guiaRemisionDetalles.forEach((item) => {
      this.detalles.push(item);

      //this.detallesArray.push(this.fb.control(item, Validators.required));
    });
  }

  @Output() onSubmit: EventEmitter<GuiaRemision> =
    new EventEmitter<GuiaRemision>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formGuiaRemision: FormGroup = this.fb.group({
    proveedor: [null, [Validators.required]],
    numero: ['', [Validators.required, Validators.min(1)]],
    fechaEmision: ['', [Validators.required]],
    porcentajeComision: ['', [Validators.required]],
    guiaRemisionDetalles: this.fb.array([]),
  });

  formDetalle: FormGroup = this.fb.group({
    marca: [null, [Validators.required]],
    producto: [null, [Validators.required]],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precioVenta: [1, [Validators.required, Validators.min(1)]],
  });

  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  detalles: GuiaRemisionDetalle[] = [];
  marcas: Marca[] = [];

  get porcentajeComision(): number {
    return this.formGuiaRemision.get('porcentajeComision')?.value;
  }

  get detallesArray() {
    return this.formGuiaRemision.get('guiaRemisionDetalles') as FormArray;
  }

  // CONSTRUCTOR
  constructor(
    private proveedoresService: ProveedoresService,
    private productosService: ProductosService,
    private marcasService: MarcasService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listarProveedores();
    //this.listarProductos();
    this.listarMarcas();
  }

  listarMarcas() {
    this.marcasService.getAll().subscribe((marcas) => (this.marcas = marcas));
  }

  // método que verifica la existencia de un producto entre los items
  existeDetalle(productoId: number): boolean {
    let existe: boolean = false;

    this.detalles.forEach((item: GuiaRemisionDetalle) => {
      // comparamos el parámetro con el "id" de productos ya existentes entre los "items"
      if (productoId === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  // YA NO LO USAMOS - EN VEZ USAREMOS "agregarDetalle()"
  agregarDetalle2() {
    let productoId: number = this.formDetalle.value.producto.id;

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

    this.detallesArray.push(
      this.fb.control(this.formDetalle.value, Validators.required)
    );

    this.detalles.push(this.formDetalle.value);

    console.log('this.formDetalle.value', this.formDetalle.value);

    console.log('detalles', this.detalles);

    this.formDetalle.reset();
  }

  listarProveedores(): void {
    this.proveedoresService.getAll().subscribe((response) => {
      this.proveedores = response;
    });
  }

  agregarDetalle() {
    this.detalles.push(this.formDetalle.value);
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
    this.detalles = this.detalles.map((detalle: GuiaRemisionDetalle) => {
      // Si el parámetro "productoId" coincide con algún "id" de entre los "detalles" actuales le asignamos la cantidad de la caja de texto
      if (productoId === detalle.producto.id) {
        detalle.cantidad = cantidad;
      }
      // Devolvemos el item con la nueva cantidad asignada, así actualiza el importe
      return detalle;
    });
    console.log('items', this.detalles);
  }

  actualizarPrecioVenta(productoId: number, event: any): void {
    let precioVenta: number = event.target.value as number;

    this.detalles = this.detalles.map((detalle: GuiaRemisionDetalle) => {
      // Si el parámetro "productoId" coincide con algún "id" de entre los "detalles" actuales le asignamos la cantidad de la caja de texto
      if (productoId === detalle.producto.id) {
        detalle.precioVenta = precioVenta;
        detalle.precioCompra = this.calcularPrecioCompra(precioVenta);
        detalle.totalDetalle = this.calcularPrecioTotalVenta(
          detalle.cantidad,
          detalle.precioVenta
        );
      }
      // Devolvemos el item con la nueva cantidad asignada, así actualiza el importe
      return detalle;
    });
  }

  actualizarPreciosPorPorcentaje(event: any) {
    console.log('porcentaje comision event', event.target.value);
    this.detalles.forEach((item) => {
      item.precioCompra = this.calcularPrecioCompra(item.precioVenta);
    });
  }

  calcularPrecioCompra(precioVenta: number) {
    let importeComision: number = precioVenta * (this.porcentajeComision / 100);

    let precioCompra: number = precioVenta - importeComision;

    return precioCompra;
  }

  calcularPrecioTotalVenta(precioVenta: number, total: number) {
    return precioVenta * total;
  }

  // listarProductos(): void {
  //   this.productosService.getAll().subscribe((response) => {
  //     this.productos = response;
  //   });
  // }

  submitForm() {
    if (this.formGuiaRemision.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formGuiaRemision.markAllAsTouched();
      return;
    }

    this.detalles = this.detalles.map((detalle) => {
      delete detalle.precioCompra;
      delete detalle.totalDetalle;
      return detalle;
    });

    //this.detallesArray.push(this.fb.control(this.detalles));

    this.detalles.forEach((item) =>
      this.detallesArray.push(this.fb.control(item, Validators.required))
    );

    this.onSubmit.emit(this.formGuiaRemision.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  campoNoValido(campo: string) {
    return (
      this.formGuiaRemision.get(campo)?.invalid &&
      this.formGuiaRemision.get(campo)?.touched
    );
  }

  campoDetalleNoValido(campo: string) {
    return (
      this.formDetalle.get(campo)?.invalid &&
      this.formDetalle.get(campo)?.touched
    );
  }

  itemSelected(event: any) {
    console.log(event);
  }

  itemSelectedProducto(event: any) {
    console.log('itemSelectedProducto');
    console.log(event);

    let productoId: number = event.id;

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
    console.log('this.detalles1', this.detalles);

    this.detalles.push(this.formDetalle.value);
    console.log('this.detalles2', this.detalles);

    this.detalles = this.detalles.map((detalle) => {
      if (detalle.producto.id === event.id) {
        detalle.producto.nombre = event.cadenaProducto;
      }
      return detalle;
    });

    console.log('this.detalles3', this.detalles);
  }

  itemSelectedMarca(event: any) {
    console.log(event);
    this.productosService.getAllByMarcaId(event.id).subscribe((response) => {
      this.productos = response;
      console.log('this.productosList', this.productos);
    });
  }

  nuevoProveedor() {
    console.log('Nuevo proveedor');
  }

  nuevoProducto() {
    console.log('Nuevo producto');
  }

  eliminarDetalle(detalle: GuiaRemisionDetalle) {
    /*
    const index = this.detallesArray.value.findIndex(
      (item: GuiaRemisionDetalle) => item.producto.id === detalle.producto.id
    );

    if (index != -1) {
      this.detallesArray.removeAt(index);
      console.log('this.detallesArray', this.detallesArray);
    }
    */

    // re asignamos los items, con el método "filter()" de JS, todos aquellos que no coincidan con el parámetro "productoId"
    this.detalles = this.detalles.filter(
      (item: GuiaRemisionDetalle) => item.producto.id !== detalle.producto.id
    );
  }
}
