import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroVentasComponent } from './pages/registro-ventas/registro-ventas.component';
import { LiquidacionProveedoresComponent } from './pages/liquidacion-proveedores/liquidacion-proveedores.component';
import { KardexPorProductoComponent } from './pages/kardex-por-producto/kardex-por-producto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'registro-ventas', component: RegistroVentasComponent },
      {
        path: 'liquidacion-proveedores',
        component: LiquidacionProveedoresComponent,
      },
      { path: 'kardex-por-producto', component: KardexPorProductoComponent },
      { path: '**', redirectTo: 'registro-ventas' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
