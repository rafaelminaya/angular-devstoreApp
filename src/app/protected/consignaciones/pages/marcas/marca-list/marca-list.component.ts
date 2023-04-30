import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styles: [],
})
export class MarcaListComponent implements OnInit {
  // PROPIEDADES
  marcas: Marca[] = [];

  marca: Marca = {
    id: 0,
    nombre: '',
    eliminado: false,
  };

  // CONSTRUCTOR
  constructor(private marcasService: MarcasService) {}

  // MÉTDOOS
  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.marcasService.getAll().subscribe((response) => {
      this.marcas = response;
    });
  }

  eliminar(id: number): void {
    this.marcasService.delete(id).subscribe((response) => {
      console.log('response', response);
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Eliminado con éxito.',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
      });

      this.listar();
    });
  }

  asignarMarca(marca: Marca): void {
    this.marca = marca;
  }
}
