import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styles: [],
})
export class MarcaEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  marca!: Marca;

  formMarca: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
  });

  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private marcasService: MarcasService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.obtenerMarca();
  }

  obtenerMarca() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.marcasService.get(id).subscribe((marca) => {
        this.marca = marca;

        this.formMarca.setValue({
          nombre: this.marca.nombre,
        });
      });
    });
  }

  submitFormulario(): void {
    if (this.formMarca.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formMarca.markAllAsTouched();
      return;
    }

    this.marca = this.formMarca.value;

    this.marcasService.update(this.id, this.marca).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Marca modificada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
    });
  }

  campoNoValido(campo: string) {
    return (
      this.formMarca.get(campo)?.invalid && this.formMarca.get(campo)?.touched
    );
  }
}
