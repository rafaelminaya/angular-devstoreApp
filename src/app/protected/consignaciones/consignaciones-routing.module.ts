import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiaRemisionAddComponent } from './pages/guias-remision/guia-remision-add/guia-remision-add.component';
import { GuiaRemisionListComponent } from './pages/guias-remision/guia-remision-list/guia-remision-list.component';
import { MarcaAddComponent } from './pages/marcas/marca-add/marca-add.component';
import { MarcaListComponent } from './pages/marcas/marca-list/marca-list.component';
import { ProductoAddComponent } from './pages/productos/producto-add/producto-add.component';
import { ProductoListComponent } from './pages/productos/producto-list/producto-list.component';
import { ProveedorAddComponent } from './pages/proveedores/proveedor-add/proveedor-add.component';
import { ProveedorListComponent } from './pages/proveedores/proveedor-list/proveedor-list.component';
import { MarcaEditComponent } from './pages/marcas/marca-edit/marca-edit.component';
import { ProductoEditComponent } from './pages/productos/producto-edit/producto-edit.component';
import { ProveedorEditComponent } from './pages/proveedores/proveedor-edit/proveedor-edit.component';
import { GuiaRemisionEditComponent } from './pages/guias-remision/guia-remision-edit/guia-remision-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'guias-remision',
        component: GuiaRemisionListComponent,
      },
      {
        path: 'guias-remision/page/:page',
        component: GuiaRemisionListComponent,
      },
      {
        path: 'guias-remision/crear',
        component: GuiaRemisionAddComponent,
      },
      {
        path: 'guias-remision/edit/:id',
        component: GuiaRemisionEditComponent,
      },
      {
        path: 'proveedores',
        component: ProveedorListComponent,
      },
      {
        path: 'proveedores/page/:page',
        component: ProveedorListComponent,
      },
      {
        path: 'proveedores/crear',
        component: ProveedorAddComponent,
      },
      {
        path: 'proveedores/edit/:id',
        component: ProveedorEditComponent,
      },
      {
        path: 'productos',
        component: ProductoListComponent,
      },
      {
        path: 'productos/page/:page',
        component: ProductoListComponent,
      },
      {
        path: 'productos/crear',
        component: ProductoAddComponent,
      },
      {
        path: 'productos/edit/:id',
        component: ProductoEditComponent,
      },
      {
        path: 'marcas',
        component: MarcaListComponent,
      },
      {
        path: 'marcas/page/:page',
        component: MarcaListComponent,
      },
      {
        path: 'marcas/crear',
        component: MarcaAddComponent,
      },
      {
        path: 'marcas/edit/:id',
        component: MarcaEditComponent,
      },
      {
        path: '**',
        redirectTo: 'guias-remision',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsignacionesRoutingModule {}
