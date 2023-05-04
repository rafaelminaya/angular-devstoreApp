import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../../services/proveedores.service';
import { BackendResponse } from 'src/app/protected/interfaces/backend-response.interface';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styles: [],
})
export class ProveedorEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  proveedor!: Proveedor;

  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private proveedoresService: ProveedoresService,
    private router: Router
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
      });
    });
  }

  submit(proveedor: Proveedor): void {
    this.proveedoresService.update(this.id, proveedor).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Proveedor editado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.router.navigate(['/dashboard/consignaciones/proveedores']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/proveedores']);
  }
}
