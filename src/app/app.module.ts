import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistraPartesPc } from './components/registra-partespc/registra-partespc.component';
import { RegistraProgramas } from './components/registra-programas/registra-programas.component';
import { MantenimientoPartesPc } from './components/mantenimiento-partespc/mantenimiento-partespc.component';
import { MantenimientoProgramas } from './components/mantenimiento-programas/mantenimiento-programas.component';

@NgModule({
  declarations: [
    AppComponent,

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
