import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { Producto } from '../../../interfaces/producto.interface';
import { MarcasService } from '../../../services/marcas.service';
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

  marcas: Marca[] = [];

  formProducto: FormGroup = this.fb.group({
    codigo: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],

    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    talla: ['', [Validators.minLength(1), Validators.maxLength(255)]],

    color: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    precioCompra: ['', [Validators.min(0)]],
    precioVenta: ['', [Validators.min(0)]],
    marca: [, Validators.required],
  });

  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private marcasService: MarcasService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listarMarcas();
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.productosService.get(id).subscribe((producto) => {
        this.producto = producto;

        this.formProducto.setValue({
          codigo: this.producto.codigo,
          nombre: this.producto.nombre,
          talla: this.producto.talla,
          color: this.producto.color,
          precioCompra: this.producto.precioCompra,
          precioVenta: this.producto.precioVenta,
          marca: this.producto.marca,
        });
      });
    });
  }

  listarMarcas(): void {
    this.marcasService.getAll().subscribe((response) => {
      this.marcas = response;
    });
  }

  itemSelected(event: any) {
    console.log(event);
  }

  submitFormulario(): void {
    if (this.formProducto.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formProducto.markAllAsTouched();
      return;
    }

    this.producto = this.formProducto.value;

    this.productosService
      .update(this.id, this.producto)
      .subscribe((response) => {
        console.log('response', response);
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Producto editado con éxito.',
          showConfirmButton: false,
          timer: 3500,
          toast: true,
        });
      });

    this.formProducto.reset();
  }

  campoNoValido(campo: string) {
    return (
      this.formProducto.get(campo)?.invalid &&
      this.formProducto.get(campo)?.touched
    );
  }
}
