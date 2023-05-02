import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styles: [],
})
export class ClienteEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  cliente!: Cliente;

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
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private fb: FormBuilder
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.obtenerCliente();
  }

  obtenerCliente() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.clientesService.get(id).subscribe((cliente) => {
        this.cliente = cliente;

        this.formCliente.setValue({
          nombre: this.cliente.nombre,
          numeroDocumento: this.cliente.numeroDocumento,
          direccion: this.cliente.direccion,
          telefono: this.cliente.telefono,
        });
      });
    });
  }

  submitFormulario(): void {
    if (this.formCliente.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formCliente.markAllAsTouched();
      return;
    }

    this.cliente = this.formCliente.value;

    this.clientesService.update(this.id, this.cliente).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'cliente modificado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });
    });
  }

  campoNoValido(campo: string) {
    return (
      this.formCliente.get(campo)?.invalid &&
      this.formCliente.get(campo)?.touched
    );
  }
}
