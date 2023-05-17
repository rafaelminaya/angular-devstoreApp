import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Marca } from '../../../interfaces/marca.interface';
import { MarcasService } from '../../../services/marcas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styles: [],
})
export class MarcaListComponent implements OnInit {
  // PROPIEDADES
  marcas: Marca[] = [];
  paginador: any;
  urlPagina: string = '/dashboard/consignaciones/marcas/page/';

  marca: Marca = {
    id: 0,
    nombre: '',
    eliminado: false,
  };

  // CONSTRUCTOR
  constructor(
    private marcasService: MarcasService,
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

      this.marcasService.getAllPaginatation(page).subscribe((response) => {
        this.marcas = response.content;
        this.paginador = response;

        console.log('this.marcas', this.marcas);
        console.log('this.paginador', this.paginador);
      });
    });
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

      this.listarYPaginar();
    });
  }

  asignarMarca(marca: Marca): void {
    this.marca = marca;
  }
}
