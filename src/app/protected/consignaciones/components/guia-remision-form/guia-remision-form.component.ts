import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GuiaRemision } from '../../interfaces/guia-remision.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  }

  @Output() onSubmit: EventEmitter<GuiaRemision> =
    new EventEmitter<GuiaRemision>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formGuiaRemision: FormGroup = this.fb.group({
    numero: ['', [Validators.required, Validators.min(1)]],
    fechaEmision: ['', [Validators.required]],
    porcentajeComision: ['', [Validators.required]],
  });

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {}

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
}
