import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { PresentRoutingModule } from './present-routing.module';
import { PresentComponent } from './present.component';


@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, PresentRoutingModule],
  entryComponents: [PresentComponent],
  declarations: [PresentComponent]
})
export class PresentModule {}
