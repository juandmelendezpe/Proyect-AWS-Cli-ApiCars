import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutosListaComponent } from './components/autos-lista/autos-lista.component';
import { AutoDetalleComponent } from './components/auto-detalle/auto-detalle.component';
import { AutoFormComponent } from './components/auto-form/auto-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AutosListaComponent,
    AutoDetalleComponent,
    AutoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
