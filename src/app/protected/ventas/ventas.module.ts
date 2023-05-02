import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BoletaVentaAddComponent } from './pages/boletas-venta/boleta-venta-add/boleta-venta-add.component';
import { BoletaVentaListComponent } from './pages/boletas-venta/boleta-venta-list/boleta-venta-list.component';
import { ClienteAddComponent } from './pages/clientes/cliente-add/cliente-add.component';
import { ClienteListComponent } from './pages/clientes/cliente-list/cliente-list.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { ClienteEditComponent } from './pages/clientes/cliente-edit/cliente-edit.component';
import { BoletaVentaEditComponent } from './pages/boletas-venta/boleta-venta-edit/boleta-venta-edit.component';

@NgModule({
  declarations: [
    BoletaVentaListComponent,
    BoletaVentaAddComponent,
    ClienteListComponent,
    ClienteAddComponent,
    ClienteEditComponent,
    BoletaVentaEditComponent,
  ],
  imports: [CommonModule, VentasRoutingModule, ReactiveFormsModule],
})
export class VentasModule {}
