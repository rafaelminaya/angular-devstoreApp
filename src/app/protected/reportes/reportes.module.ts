import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { RegistroVentasComponent } from './pages/registro-ventas/registro-ventas.component';
import { LiquidacionProveedoresComponent } from './pages/liquidacion-proveedores/liquidacion-proveedores.component';
import { KardexPorProductoComponent } from './pages/kardex-por-producto/kardex-por-producto.component';


@NgModule({
  declarations: [
    RegistroVentasComponent,
    LiquidacionProveedoresComponent,
    KardexPorProductoComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
