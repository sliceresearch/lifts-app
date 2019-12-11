import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ViewArRoutingModule } from './view-ar-routing.module';
import { ViewArComponent } from './view-ar.component';
import { App3Module } from '../app3/app3.module';

// import { TabsModule } from '../tabs/tabs.module';

@NgModule({
  imports: [CommonModule, TranslateModule, IonicModule, ViewArRoutingModule, App3Module],
  entryComponents: [ViewArComponent],
  declarations: [ViewArComponent]
})
export class ViewArModule {}
