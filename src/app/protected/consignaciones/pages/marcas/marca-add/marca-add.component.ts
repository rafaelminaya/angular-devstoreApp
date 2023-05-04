import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-marca-add',
  templateUrl: './marca-add.component.html',
  styles: [],
})
export class MarcaAddComponent implements OnInit {
  // CONSTRUCTOR
  constructor(private marcasService: MarcasService, private router: Router) {}

  // MÉTODOS
  ngOnInit(): void {}

  submit(marca: Marca): void {
    this.marcasService.add(marca).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Marca creada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      //this.formMarca.reset();
      this.router.navigate(['/dashboard/consignaciones/marcas']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/marcas']);
  }
}
