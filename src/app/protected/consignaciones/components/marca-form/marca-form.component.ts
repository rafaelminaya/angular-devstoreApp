import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from '../../interfaces/marca.interface';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styles: [],
})
export class MarcaFormComponent implements OnInit {
  // PROPIEDADES
  @Input() labelSubmit = '';
  @Input()
  set model(model: Marca) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formMarca.patchValue(model);
  }

  @Output() onSubmit: EventEmitter<Marca> = new EventEmitter<Marca>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formMarca: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
  });

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitForm() {
    if (this.formMarca.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formMarca.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.formMarca.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  campoNoValido(campo: string) {
    return (
      this.formMarca.get(campo)?.invalid && this.formMarca.get(campo)?.touched
    );
  }
}
