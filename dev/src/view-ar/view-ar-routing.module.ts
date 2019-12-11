import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ViewArComponent } from './view-ar.component';

const routes: Routes = [
  Shell.childRoutes([
    //  { path: 'ar', redirectTo: '/', pathMatch: 'full' },
    { path: 'ar', component: ViewArComponent, data: { title: extract('choice-toastar (AR)') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ViewArRoutingModule {}
