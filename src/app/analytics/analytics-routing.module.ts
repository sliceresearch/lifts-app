import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AnalyticsComponent } from './analytics.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/analytics', pathMatch: 'full' },
    { path: 'analytics', component: AnalyticsComponent, data: { title: extract('Analytics') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnalyticsRoutingModule {}
