import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  GuiaRemision,
  GuiaRemisionDetalle,
} from '../../interfaces/guia-remision.interface';
import { Producto, ProductoByMarca } from '../../interfaces/producto.interface';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { ProductosService } from '../../services/productos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { Marca } from '../../interfaces/marca.interface';
import { MarcasService } from '../../services/marcas.service';

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

      this.detallesArray.push(this.fb.control(item, Validators.required));
    });
  }

  @Output() onSubmit: EventEmitter<GuiaRemision> =
    new EventEmitter<GuiaRemision>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formGuiaRemision: FormGroup = this.fb.group({
    proveedor: ['', [Validators.required]],
    numero: ['', [Validators.required, Validators.min(1)]],
    fechaEmision: ['', [Validators.required]],
    porcentajeComision: ['', [Validators.required]],
    guiaRemisionDetalles: this.fb.array([]),
  });

  formDetalle: FormGroup = this.fb.group({
    marca: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    cantidad: [0, [Validators.required, Validators.min(1)]],
    precioVenta: [0, [Validators.required, Validators.min(1)]],
  });

  proveedores: Proveedor[] = [];
  //productos: Producto[] = [];
  productos: ProductoByMarca[] = [];
  detalles: GuiaRemisionDetalle[] = [];
  marcas: Marca[] = [];

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

  agregarDetalle() {
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
    const index = this.detallesArray.value.findIndex(
      (item: GuiaRemisionDetalle) => item.producto.id === detalle.producto.id
    );

    if (index != -1) {
      this.detallesArray.removeAt(index);
      console.log('this.detallesArray', this.detallesArray);
    }

    // re asignamos los items, con el método "filter()" de JS, todos aquellos que no coincidan con el parámetro "productoId"
    this.detalles = this.detalles.filter(
      (item: GuiaRemisionDetalle) => item.producto.id !== detalle.producto.id
    );
  }
}
