import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistraProductoComponent } from './components/registra-producto/registra-producto.component';
import { CrudProductoComponent } from './components/crud-producto/crud-producto.component';
import { ConsultaProductoComponent } from './components/consulta-producto/consulta-producto.component';
import { RegistraPartesPc } from './components/registra-partespc/registra-partespc.component';
import { RegistraProgramas } from './components/registra-programas/registra-programas.component';
import { MantenimientoPartesPc } from './components/mantenimiento-partespc/mantenimiento-partespc.component';
import { MantenimientoProgramas } from './components/mantenimiento-programas/mantenimiento-programas.component';



const routes: Routes = [
  
  {path:"registraProducto", component:RegistraProductoComponent },
  {path:"crudProducto", component:CrudProductoComponent },
  {path:"consultaProducto", component:ConsultaProductoComponent },


  {path:"registraPartesPc", component:RegistraPartesPc},
  {path:"registraProgramas", component:RegistraProgramas},
  {path:"mantenimientoPartesPc", component:MantenimientoPartesPc},
  {path:"mantenimientoProgramas", component:MantenimientoProgramas}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
