import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GuiaRemision } from '../../../interfaces/guia-remision.interface';
import { GuiasRemisionService } from '../../../services/guias-remision.service';
import { switchMap } from 'rxjs';
import { BackendResponse } from 'src/app/protected/interfaces/backend-response.interface';

@Component({
  selector: 'app-guia-remision-edit',
  templateUrl: './guia-remision-edit.component.html',
  styles: [],
})
export class GuiaRemisionEditComponent implements OnInit {
  // PROPIEDADES
  id!: number;

  guiaRemision!: GuiaRemision;
  // CONSTRUCTOR
  constructor(
    private activatedRoute: ActivatedRoute,
    private guiasRemisionService: GuiasRemisionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerGuiaRemision();
  }

  obtenerGuiaRemision() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.guiasRemisionService.get(id).subscribe((guiaRemision) => {
        this.guiaRemision = guiaRemision;
        console.log('guiaRemision', guiaRemision);
      });
    });
  }

  submit(guiaRemision: GuiaRemision): void {
    console.log('guiaRemision', guiaRemision);

    this.guiasRemisionService
      .desprocesar(this.id)
      .pipe(
        switchMap((_) =>
          this.guiasRemisionService.update(this.id, guiaRemision)
        ),
        switchMap((response: BackendResponse) =>
          this.guiasRemisionService.procesar(response.id!)
        )
      )
      .subscribe((response) => {
        console.log('response', response);

        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Guia de remisión editada con éxito.',
          showConfirmButton: false,
          timer: 3500,
          toast: true,
        });

        this.router.navigate(['/dashboard/consignaciones/guias-remision']);
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/consignaciones/guias-remision']);
  }
}
