import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConsignacionesRoutingModule } from './consignaciones-routing.module';
import { GuiaRemisionAddComponent } from './pages/guias-remision/guia-remision-add/guia-remision-add.component';
import { GuiaRemisionListComponent } from './pages/guias-remision/guia-remision-list/guia-remision-list.component';
import { MarcaAddComponent } from './pages/marcas/marca-add/marca-add.component';
import { MarcaEditComponent } from './pages/marcas/marca-edit/marca-edit.component';
import { MarcaListComponent } from './pages/marcas/marca-list/marca-list.component';
import { ProductoAddComponent } from './pages/productos/producto-add/producto-add.component';
import { ProductoListComponent } from './pages/productos/producto-list/producto-list.component';
import { ProveedorAddComponent } from './pages/proveedores/proveedor-add/proveedor-add.component';
import { ProveedorListComponent } from './pages/proveedores/proveedor-list/proveedor-list.component';
import { ProveedorEditComponent } from './pages/proveedores/proveedor-edit/proveedor-edit.component';
import { ProductoEditComponent } from './pages/productos/producto-edit/producto-edit.component';
import { GuiaRemisionEditComponent } from './pages/guias-remision/guia-remision-edit/guia-remision-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarcaFormComponent } from './components/marca-form/marca-form.component';
import { ProveedorFormComponent } from './components/proveedor-form/proveedor-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { GuiaRemisionFormComponent } from './components/guia-remision-form/guia-remision-form.component';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';

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
    MarcaEditComponent,
    ProveedorEditComponent,
    ProductoEditComponent,
    GuiaRemisionEditComponent,
    MarcaFormComponent,
    ProveedorFormComponent,
    ProductoFormComponent,
    GuiaRemisionFormComponent,
  ],
  imports: [
    CommonModule,
    ConsignacionesRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
    SharedModule,
  ],
})
export class ConsignacionesModule {}
