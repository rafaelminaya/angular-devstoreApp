import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styles: [],
})
export class ProveedorListComponent implements OnInit {
  // PROPIEDADES
  proveedores: Proveedor[] = [];

  proveedor: Proveedor = {
    id: 0,
    ruc: '',
    razonComercial: '',
    email: '',
    direccion: '',
    telefono: '',
    eliminado: false,
  };
  // CONSTRUCTOR
  constructor(private proveedorService: ProveedoresService) {}
  // MÉTODOS
  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.proveedorService.getAll().subscribe((response) => {
      console.log(response);
      this.proveedores = response;
    });
  }

  eliminar(id: number): void {
    this.proveedorService.delete(id).subscribe((response) => {
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Proveedor eliminado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.listar();
    });
  }

  asignarProveedor(proveedor: Proveedor): void {
    this.proveedor = proveedor;
  }
}
