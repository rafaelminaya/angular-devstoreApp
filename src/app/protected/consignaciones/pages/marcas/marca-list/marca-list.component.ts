import { Component, OnInit } from '@angular/core';
import { Marca } from '../../../interfaces/guia-remision.interface';
import { MarcasService } from '../../../services/marcas.service';
import Swal from 'sweetalert2';

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
    this.marcasService.getMarcas().subscribe((response) => {
      this.marcas = response;
    });
  }

  eliminar(id: number): void {
    this.marcasService.eliminarMarca(id).subscribe((response) => {
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

  asignarMarca(marca: Marca): void {
    this.marca = marca;
  }
}
