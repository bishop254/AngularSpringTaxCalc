import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPageComponent },
  {
    path: 'teams',
    loadComponent: () =>
      import('./components/teams/teams.component').then(
        (mod) => mod.TeamsComponent
      ),
  },
  { path: '**', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
