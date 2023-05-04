import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoletaVenta } from '../../interfaces/boleta-venta-interface';

@Component({
  selector: 'app-boleta-venta-form',
  templateUrl: './boleta-venta-form.component.html',
  styles: [],
})
export class BoletaVentaFormComponent implements OnInit {
  // PROPIEDADES
  @Input() labelSubmit = '';
  @Input()
  set model(model: BoletaVenta) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formBoletaVenta.patchValue(model);
  }

  @Output() onSubmit: EventEmitter<BoletaVenta> =
    new EventEmitter<BoletaVenta>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  formBoletaVenta: FormGroup = this.fb.group({
    numero: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
  });

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitForm() {
    if (this.formBoletaVenta.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formBoletaVenta.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.formBoletaVenta.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  campoNoValido(campo: string) {
    return (
      this.formBoletaVenta.get(campo)?.invalid &&
      this.formBoletaVenta.get(campo)?.touched
    );
  }
}
