import { Component, OnInit } from '@angular/core';
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
  constructor(private guiasService: GuiasRemisionService) {}
  // MÉTODOS
  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.guiasService.getAll().subscribe((response) => {
      console.log(response);
      this.guiasRemision = response;
    });
  }

  eliminar(id: number): void {
    this.guiasService.delete(id).subscribe((response) => {
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

  asignarGuia(guia: GuiaRemision): void {
    this.guiaRemision = guia;
  }
}
