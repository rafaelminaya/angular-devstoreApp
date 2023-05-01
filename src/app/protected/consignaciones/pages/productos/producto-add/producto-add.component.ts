import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductosService } from '../../../services/productos.service';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styles: [],
})
export class ProductoAddComponent implements OnInit {
  // PROPIEDADES
  newProducto: Producto = {
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
    private productosService: ProductosService,
    private marcasService: MarcasService,
    private fb: FormBuilder
  ) {}
  // MÉTDOOS
  ngOnInit(): void {
    this.listarMarcas();
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

    this.newProducto = this.formProducto.value;

    this.productosService.add(this.newProducto).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Producto creado con éxito.',
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
