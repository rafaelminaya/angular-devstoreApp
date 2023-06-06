import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcasService } from '../../services/marcas.service';
import { Marca } from '../../interfaces/marca.interface';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styles: [],
})
export class ProductoFormComponent implements OnInit {
  // PROPIEDADES
  @Input() labelSubmit = '';
  @Input()
  set model(model: Producto) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formProducto.patchValue(model);
  }

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
    stock: [{ value: 0, disabled: true }],
    marca: [null, Validators.required],
  });

  @Output() onSubmit: EventEmitter<Producto> = new EventEmitter<Producto>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  marcas: Marca[] = [];

  // CONSTRUCTOR
  constructor(private marcasService: MarcasService, private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {
    this.listarMarcas();
  }

  submitForm() {
    if (this.formProducto.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formProducto.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.formProducto.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  listarMarcas(): void {
    this.marcasService.getAll().subscribe((response) => {
      this.marcas = response;
    });
  }

  itemSelected(event: any) {
    console.log(event);
  }

  campoNoValido(campo: string) {
    return (
      this.formProducto.get(campo)?.invalid &&
      this.formProducto.get(campo)?.touched
    );
  }
}
