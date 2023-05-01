import { Component, OnInit } from '@angular/core';
import { GuiasRemisionService } from '../../../services/guias-remision.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guia-remision-add',
  templateUrl: './guia-remision-add.component.html',
  styles: [],
})
export class GuiaRemisionAddComponent implements OnInit {
  // PROPIEDADES
  formGuiaRemision: FormGroup = this.fb.group({
    numero: ['', [Validators.required, Validators.min(1)]],
    fechaEmision: ['', [Validators.required]],
    porcentajeComision: ['', [Validators.required]],
  });

  // CONSTRUCTOR
  constructor(
    private guiasService: GuiasRemisionService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitFormulario(): void {
    if (this.formGuiaRemision.invalid) {
      this.formGuiaRemision.markAllAsTouched();
      return;
    }

    console.log(this.formGuiaRemision.value);
  }

  campoNoValido(campo: string) {
    return (
      this.formGuiaRemision.get(campo)?.invalid &&
      this.formGuiaRemision.get(campo)?.touched
    );
  }
}
