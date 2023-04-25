import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsignacionesRoutingModule } from './consignaciones-routing.module';
import { GuiaRemisionListComponent } from './pages/guia-remision-list/guia-remision-list.component';
import { GuiaRemisionAddComponent } from './pages/guia-remision-add/guia-remision-add.component';


@NgModule({
  declarations: [
    GuiaRemisionListComponent,
    GuiaRemisionAddComponent
  ],
  imports: [
    CommonModule,
    ConsignacionesRoutingModule
  ]
})
export class ConsignacionesModule { }
