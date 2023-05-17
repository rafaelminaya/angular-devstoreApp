import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { GuiaRemision } from '../../../interfaces/guia-remision.interface';
import { GuiasRemisionService } from '../../../services/guias-remision.service';

@Component({
  selector: 'app-guia-remision-list',
  templateUrl: './guia-remision-list.component.html',
  styles: [],
})
export class GuiaRemisionListComponent implements OnInit {
  // PROPIEDADES
  guiasRemision: GuiaRemision[] = [];
  paginador: any;
  urlPagina: string = '/dashboard/consignaciones/guias-remision/page/';

  guiaRemision: GuiaRemision = {
    id: 0,
    numero: '',
    fechaEmision: new Date(),
    porcentajeComision: 0,
    proveedor: {
      id: 0,
      ruc: '',
      razonComercial: '',
      email: '',
      direccion: '',
      telefono: '',
      eliminado: false,
    },
    guiaRemisionDetalles: [],
    procesado: false,
    eliminado: false,
  };
  // CONSTRUCTOR
  constructor(
    private guiasService: GuiasRemisionService,
    private activatedRoute: ActivatedRoute
  ) {}
  // MÉTODOS
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

      this.guiasService.getAllPaginatation(page).subscribe((response) => {
        this.guiasRemision = response.content;
        this.paginador = response;

        console.log('this.guiasRemision', this.guiasRemision);
        console.log('this.paginador', this.paginador);
      });
    });
  }

  listar(): void {
    this.guiasService.getAll().subscribe((response) => {
      this.guiasRemision = response;
    });
  }

  eliminar(id: number): void {
    this.guiasService
      .desprocesar(id)
      .pipe(switchMap((_) => this.guiasService.delete(id)))
      .subscribe((_) => {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Eliminado con éxito.',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        this.listarYPaginar();
      });
  }

  asignarGuia(guia: GuiaRemision): void {
    this.guiaRemision = guia;
  }
}
