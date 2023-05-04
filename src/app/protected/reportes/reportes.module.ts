import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { KardexPorProductoComponent } from './pages/kardex-por-producto/kardex-por-producto.component';
import { LiquidacionProveedoresComponent } from './pages/liquidacion-proveedores/liquidacion-proveedores.component';
import { RegistroVentasComponent } from './pages/registro-ventas/registro-ventas.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RegistroVentasComponent,
    LiquidacionProveedoresComponent,
    KardexPorProductoComponent,
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
  ],
})
export class ReportesModule {}
