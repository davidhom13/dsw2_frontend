import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistraProductoComponent } from './components/registra-producto/registra-producto.component';
import { ConsultaProductoComponent } from './components/consulta-producto/consulta-producto.component';
import { CrudProductoComponent } from './components/crud-producto/crud-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistraProductoComponent,
    ConsultaProductoComponent,
    CrudProductoComponent,

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
