import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styles: [],
})
export class ClienteListComponent implements OnInit {
  // PROPIEDADES
  clientes: Cliente[] = [];
  paginador: any;
  urlPagina: string = '/dashboard/ventas/clientes/page/';

  cliente: Cliente = {
    id: 0,
    numeroDocumento: '',
    nombre: '',
    direccion: '',
    telefono: '',
    eliminado: false,
  };
  // CONSTRUCTOR
  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute
  ) {}

  // MÉTDOOS
  ngOnInit(): void {
    this.listarYPaginar();
  }

  listarYPaginar(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page')!;

      //Validación para la primera página, para cuando no haya este parámetro se le asigne el valor de cero "0".
      if (!page) {
        page = 0;
      }

      this.clientesService.getAllPaginatation(page).subscribe((response) => {
        this.clientes = response.content;
        this.paginador = response;

        console.log('this.clientes', this.clientes);
        console.log('this.paginador', this.paginador);
      });
    });
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

      this.listarYPaginar();
    });
  }

  asignarCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }
}
