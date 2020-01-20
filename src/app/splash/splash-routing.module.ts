import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { SplashComponent } from './splash.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    //   { path: '', redirectTo: '/import', pathMatch: 'full' },
    { path: 'splash', component: SplashComponent, data: { title: extract('Splash') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SplashRoutingModule {}
