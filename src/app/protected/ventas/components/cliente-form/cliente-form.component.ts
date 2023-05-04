import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styles: [],
})
export class ClienteFormComponent implements OnInit {
  // PROPIEDADES
  @Input() labelSubmit = '';
  @Input()
  set model(model: Cliente) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formCliente.patchValue(model);
  }

  @Output() onSubmit: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formCliente: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    numeroDocumento: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(12)],
    ],
    direccion: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    telefono: ['', [Validators.minLength(3), Validators.maxLength(255)]],
  });

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitForm() {
    if (this.formCliente.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formCliente.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.formCliente.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  campoNoValido(campo: string) {
    return (
      this.formCliente.get(campo)?.invalid &&
      this.formCliente.get(campo)?.touched
    );
  }
}
