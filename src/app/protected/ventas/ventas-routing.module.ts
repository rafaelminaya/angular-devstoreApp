import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletaVentaListComponent } from './pages/boletas-venta/boleta-venta-list/boleta-venta-list.component';
import { BoletaVentaAddComponent } from './pages/boletas-venta/boleta-venta-add/boleta-venta-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'boletas-venta',
        component: BoletaVentaListComponent,
      },
      {
        path: 'boletas-venta/crear',
        component: BoletaVentaAddComponent,
      },
      {
        path: '**',
        redirectTo: 'boletas-venta',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
