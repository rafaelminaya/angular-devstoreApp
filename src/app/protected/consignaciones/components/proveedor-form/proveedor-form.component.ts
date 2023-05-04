import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styles: [],
})
export class ProveedorFormComponent implements OnInit {
  // PROPIEDADES
  @Input() labelSubmit = '';
  @Input()
  set model(model: Proveedor) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formProveedor.patchValue(model);
  }

  @Output() onSubmit: EventEmitter<Proveedor> = new EventEmitter<Proveedor>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formProveedor: FormGroup = this.fb.group({
    ruc: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    razonComercial: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    email: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    direccion: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    telefono: ['', [Validators.minLength(3), Validators.maxLength(255)]],
  });
  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitForm() {
    if (this.formProveedor.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formProveedor.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.formProveedor.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  campoNoValido(campo: string) {
    return (
      this.formProveedor.get(campo)?.invalid &&
      this.formProveedor.get(campo)?.touched
    );
  }
}
