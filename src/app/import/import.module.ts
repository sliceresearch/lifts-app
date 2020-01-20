import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, ImportRoutingModule],
  entryComponents: [ImportComponent],
  declarations: [ImportComponent]
})
export class ImportModule {}
