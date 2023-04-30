import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-marca-add',
  templateUrl: './marca-add.component.html',
  styles: [],
})
export class MarcaAddComponent implements OnInit {
  // PROPIEDADES
  newMarca: Marca = {
    id: 0,
    nombre: '',
    eliminado: false,
  };

  formMarca: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
  });

  // CONSTRUCTOR
  constructor(private marcasService: MarcasService, private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitFormulario(): void {
    if (this.formMarca.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formMarca.markAllAsTouched();
      return;
    }

    // const { ruc, razonComercial, email, direccion, telefono } = this.proveedorFormulario.value;

    this.newMarca = this.formMarca.value;

    this.marcasService.add(this.newMarca).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Marca creada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
    });

    this.formMarca.reset();
  }

  campoNoValido(campo: string) {
    return (
      this.formMarca.get(campo)?.invalid && this.formMarca.get(campo)?.touched
    );
  }
}
