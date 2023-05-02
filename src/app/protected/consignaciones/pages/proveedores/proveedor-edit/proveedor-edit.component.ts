import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styles: [],
})
export class ProveedorEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  proveedor!: Proveedor;

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private proveedoresService: ProveedoresService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.obtenerProveedor();
  }

  obtenerProveedor() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.proveedoresService.get(id).subscribe((proveedor) => {
        this.proveedor = proveedor;

        this.formProveedor.setValue({
          ruc: this.proveedor.ruc,
          razonComercial: this.proveedor.razonComercial,
          email: this.proveedor.email,
          direccion: this.proveedor.direccion,
          telefono: this.proveedor.telefono,
        });
      });
    });
  }

  submitFormulario(): void {
    if (this.formProveedor.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formProveedor.markAllAsTouched();
      return;
    }

    this.proveedor = this.formProveedor.value;

    this.proveedoresService
      .update(this.id, this.proveedor)
      .subscribe((response) => {
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
      this.formProveedor.get(campo)?.invalid &&
      this.formProveedor.get(campo)?.touched
    );
  }
}
