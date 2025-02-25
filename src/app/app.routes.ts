import { Routes } from '@angular/router';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
    { path: '', component: FilmListComponent },
  { path: 'film/:id', component: FilmDetailComponent },
  { path: 'formulario', component: FormularioComponent}
];
