import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistraPartesPc } from './components/registra-partespc/registra-partespc.component';
import { RegistraProgramas } from './components/registra-programas/registra-programas.component';
import { MantenimientoPartesPc } from './components/mantenimiento-partespc/mantenimiento-partespc.component';
import { MantenimientoProgramas } from './components/mantenimiento-programas/mantenimiento-programas.component';



const routes: Routes = [

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
