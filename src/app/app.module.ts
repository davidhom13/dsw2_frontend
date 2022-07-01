import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistraProductoComponent } from './components/registra-producto/registra-producto.component';
import { ConsultaProductoComponent } from './components/consulta-producto/consulta-producto.component';
import { CrudProductoComponent } from './components/crud-producto/crud-producto.component';
import { RegistraPartesPc } from './components/registra-partespc/registra-partespc.component';
import { RegistraProgramas } from './components/registra-programas/registra-programas.component';
import { MantenimientoPartesPc } from './components/mantenimiento-partespc/mantenimiento-partespc.component';
import { MantenimientoProgramas } from './components/mantenimiento-programas/mantenimiento-programas.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistraProductoComponent,
    ConsultaProductoComponent,
    CrudProductoComponent,

    RegistraPartesPc,
    RegistraProgramas,
    MantenimientoPartesPc,
    MantenimientoProgramas

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
