import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutosListaComponent } from './components/autos-lista/autos-lista.component';
import { AutoDetalleComponent } from './components/auto-detalle/auto-detalle.component';
import { AutoFormComponent } from './components/auto-form/auto-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/autos', pathMatch: 'full' },
  { path: 'autos', component: AutosListaComponent },
  { path: 'autos/nuevo', component: AutoFormComponent },
  { path: 'autos/:id', component: AutoDetalleComponent },
  { path: 'autos/:id/editar', component: AutoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
