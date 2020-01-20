import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ImportComponent } from './import.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    //   { path: '', redirectTo: '/import', pathMatch: 'full' },
    { path: 'import', component: ImportComponent, data: { title: extract('Import') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImportRoutingModule {}
