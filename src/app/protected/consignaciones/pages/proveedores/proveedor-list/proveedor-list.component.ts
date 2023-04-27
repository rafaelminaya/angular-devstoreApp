import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/guia-remision.interface';
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
    this.proveedorService.getProveedores().subscribe((response) => {
      console.log(response);
      this.proveedores = response;
    });
  }

  eliminar(id: number): void {
    this.proveedorService.eliminarProveedor(id).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Eliminado con éxito.',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    });
  }

  asignarProveedor(proveedor: Proveedor): void {
    this.proveedor = proveedor;
  }
}
