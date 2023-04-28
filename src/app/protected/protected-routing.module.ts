import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'consignaciones',
        loadChildren: () =>
          import('./consignaciones/consignaciones.module').then(
            (m) => m.ConsignacionesModule
          ),
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('./ventas/ventas.module').then((m) => m.VentasModule),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./reportes/reportes.module').then((m) => m.ReportesModule),
      },
      {
        path: '**',
        redirectTo: 'consignaciones',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
