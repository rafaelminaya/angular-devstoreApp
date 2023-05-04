import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styles: [],
})
export class ClienteAddComponent implements OnInit {
  // CONSTRUCTOR
  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(cliente: Cliente): void {
    this.clientesService.add(cliente).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Cliente creado con éxito.',
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
