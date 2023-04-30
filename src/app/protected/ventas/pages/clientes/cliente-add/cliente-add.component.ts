import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styles: [],
})
export class ClienteAddComponent implements OnInit {
  // PROPIEDADES
  newCliente: Cliente = {
    id: 0,
    numeroDocumento: '',
    nombre: '',
    direccion: '',
    telefono: '',
    eliminado: false,
  };

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
  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  submitFormulario(): void {
    if (this.formCliente.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formCliente.markAllAsTouched();
      return;
    }

    // const { ruc, razonComercial, email, direccion, telefono } = this.proveedorFormulario.value;

    this.newCliente = this.formCliente.value;

    this.clientesService.add(this.newCliente).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Cliente creado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
    });

    this.formCliente.reset();
  }

  campoNoValido(campo: string) {
    return (
      this.formCliente.get(campo)?.invalid &&
      this.formCliente.get(campo)?.touched
    );
  }
}
