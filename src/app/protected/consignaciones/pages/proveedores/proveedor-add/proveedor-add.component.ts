import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-proveedor-add',
  templateUrl: './proveedor-add.component.html',
  styles: [],
})
export class ProveedorAddComponent implements OnInit {
  // CONSTRUCTOR
  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router
  ) {}

  // MÉTODOS
  ngOnInit(): void {}

  submit(proveedor: Proveedor): void {
    this.proveedoresService.add(proveedor).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Proveedor creado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      //this.formMarca.reset();
      this.router.navigate(['/dashboard/consignaciones/proveedores']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/proveedores']);
  }
}
