import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styles: [],
})
export class ClienteListComponent implements OnInit {
  // PROPIEDADES
  clientes: Cliente[] = [];

  cliente: Cliente = {
    id: 0,
    numeroDocumento: '',
    nombre: '',
    direccion: '',
    telefono: '',
    eliminado: false,
  };
  // CONSTRUCTOR
  constructor(private clientesService: ClientesService) {}

  // MÉTDOOS
  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.clientesService.getAll().subscribe((response) => {
      this.clientes = response;
    });
  }

  eliminar(id: number): void {
    this.clientesService.delete(id).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Cliente eliminado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.listar();
    });
  }

  asignarCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }
}
