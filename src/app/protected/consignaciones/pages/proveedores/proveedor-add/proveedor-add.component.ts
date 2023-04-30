import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-proveedor-add',
  templateUrl: './proveedor-add.component.html',
  styles: [],
})
export class ProveedorAddComponent implements OnInit {
  // PROPIEDADES
  newProveedor: Proveedor = {
    id: 0,
    ruc: '',
    razonComercial: '',
    email: '',
    direccion: '',
    telefono: '',
    eliminado: false,
  };

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
    private proveedoresService: ProveedoresService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {}

  submitFormulario(): void {
    if (this.formProveedor.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formProveedor.markAllAsTouched();
      return;
    }

    // const { ruc, razonComercial, email, direccion, telefono } = this.formProveedor.value;

    this.newProveedor = this.formProveedor.value;

    this.proveedoresService.add(this.newProveedor).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Proveedor creado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
    });

    this.formProveedor.reset();
  }

  campoNoValido(campo: string) {
    return (
      this.formProveedor.get(campo)?.invalid &&
      this.formProveedor.get(campo)?.touched
    );
  }
}
