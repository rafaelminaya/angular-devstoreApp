import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ConsignacionesRoutingModule } from './consignaciones-routing.module';
import { GuiaRemisionAddComponent } from './pages/guias-remision/guia-remision-add/guia-remision-add.component';
import { GuiaRemisionListComponent } from './pages/guias-remision/guia-remision-list/guia-remision-list.component';
import { MarcaAddComponent } from './pages/marcas/marca-add/marca-add.component';
import { MarcaListComponent } from './pages/marcas/marca-list/marca-list.component';
import { ProductoAddComponent } from './pages/productos/producto-add/producto-add.component';
import { ProductoListComponent } from './pages/productos/producto-list/producto-list.component';
import { ProveedorAddComponent } from './pages/proveedores/proveedor-add/proveedor-add.component';
import { ProveedorListComponent } from './pages/proveedores/proveedor-list/proveedor-list.component';

@NgModule({
  declarations: [
    GuiaRemisionListComponent,
    GuiaRemisionAddComponent,
    MarcaAddComponent,
    MarcaListComponent,
    ProductoListComponent,
    ProductoAddComponent,
    ProveedorAddComponent,
    ProveedorListComponent,
  ],
  imports: [CommonModule, ConsignacionesRoutingModule, ReactiveFormsModule],
})
export class ConsignacionesModule {}
