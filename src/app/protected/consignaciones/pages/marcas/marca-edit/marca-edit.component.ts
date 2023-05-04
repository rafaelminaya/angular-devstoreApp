import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styles: [],
})
export class MarcaEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  marca!: Marca;

  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private marcasService: MarcasService,
    private router: Router
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.obtenerMarca();
  }

  obtenerMarca() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.marcasService.get(id).subscribe((marca) => {
        this.marca = marca;
      });
    });
  }

  submit(marca: Marca): void {
    this.marcasService.update(this.id, marca).subscribe((response) => {
      console.log('response', response);

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Marca editada con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.router.navigate(['/dashboard/consignaciones/marcas']);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/marcas']);
  }
}
