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
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { BoletaVentaFormComponent } from './components/boleta-venta-form/boleta-venta-form.component';

@NgModule({
  declarations: [
    BoletaVentaListComponent,
    BoletaVentaAddComponent,
    ClienteListComponent,
    ClienteAddComponent,
    ClienteEditComponent,
    BoletaVentaEditComponent,
    ClienteFormComponent,
    BoletaVentaFormComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class VentasModule {}
