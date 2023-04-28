import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { BoletaVentaListComponent } from './pages/boletas-venta/boleta-venta-list/boleta-venta-list.component';
import { BoletaVentaAddComponent } from './pages/boletas-venta/boleta-venta-add/boleta-venta-add.component';


@NgModule({
  declarations: [
    BoletaVentaListComponent,
    BoletaVentaAddComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
