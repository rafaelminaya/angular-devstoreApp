import { Component, OnInit } from '@angular/core';
import { GuiaRemision } from '../../../interfaces/guia-remision.interface';
import { ActivatedRoute } from '@angular/router';
import { GuiasRemisionService } from '../../../services/guias-remision.service';

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
    private guiasRemisionService: GuiasRemisionService
  ) {}

  ngOnInit(): void {
    this.obtenerGuiaRemision();
  }

  obtenerGuiaRemision() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = parseInt(id);

      this.guiasRemisionService.get(id).subscribe((guiaRemision) => {
        this.guiaRemision = guiaRemision;
      });
    });
  }
}
