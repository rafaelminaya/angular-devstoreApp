import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GuiaRemision } from '../../../interfaces/guia-remision.interface';
import { GuiasRemisionService } from '../../../services/guias-remision.service';
import { switchMap } from 'rxjs';
import { BackendResponse } from 'src/app/protected/interfaces/backend-response.interface';

@Component({
  selector: 'app-guia-remision-add',
  templateUrl: './guia-remision-add.component.html',
  styles: [],
})
export class GuiaRemisionAddComponent implements OnInit {
  // CONSTRUCTOR
  constructor(
    private guiasService: GuiasRemisionService,
    private router: Router
  ) {}

  // MÉTODOS
  ngOnInit(): void {}

  submit(guiaRemision: GuiaRemision): void {
    console.log('guiaRemision', guiaRemision);

    this.guiasService
      .add(guiaRemision)
      .pipe(
        switchMap((response: BackendResponse) =>
          this.guiasService.procesar(response.id!)
        )
      )
      .subscribe((response) => {
        console.log('response', response);

        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Guia de remisión creada con éxito.',
          showConfirmButton: false,
          timer: 3500,
          toast: true,
        });

        //this.formMarca.reset();
        this.router.navigate(['/dashboard/consignaciones/guias-remision']);
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/guias-remision']);
  }
}
