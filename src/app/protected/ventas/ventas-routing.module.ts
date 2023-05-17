import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletaVentaAddComponent } from './pages/boletas-venta/boleta-venta-add/boleta-venta-add.component';
import { BoletaVentaEditComponent } from './pages/boletas-venta/boleta-venta-edit/boleta-venta-edit.component';
import { BoletaVentaListComponent } from './pages/boletas-venta/boleta-venta-list/boleta-venta-list.component';
import { ClienteAddComponent } from './pages/clientes/cliente-add/cliente-add.component';
import { ClienteEditComponent } from './pages/clientes/cliente-edit/cliente-edit.component';
import { ClienteListComponent } from './pages/clientes/cliente-list/cliente-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'boletas-venta', component: BoletaVentaListComponent },
      { path: 'boletas-venta/page/:page', component: BoletaVentaListComponent },
      { path: 'boletas-venta/crear', component: BoletaVentaAddComponent },
      { path: 'boletas-venta/edit/:id', component: BoletaVentaEditComponent },
      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/page/:page', component: ClienteListComponent },
      { path: 'clientes/crear', component: ClienteAddComponent },
      { path: 'clientes/edit/:id', component: ClienteEditComponent },
      { path: '**', redirectTo: 'boletas-venta' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
