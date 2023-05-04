import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private router: Router
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
      });
    });
  }

  submit(cliente: Cliente): void {
    this.clientesService.update(this.id, cliente).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Cliente editado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.router.navigate(['/dashboard/ventas/clientes']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/ventas/clientes']);
  }
}
