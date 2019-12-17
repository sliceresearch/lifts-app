import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';


@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, AnalyticsRoutingModule],
  entryComponents: [AnalyticsComponent],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule {}
