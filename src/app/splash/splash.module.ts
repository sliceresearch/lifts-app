import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SplashRoutingModule } from './splash-routing.module';
import { SplashComponent } from './splash.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, SplashRoutingModule],
  entryComponents: [SplashComponent],
  declarations: [SplashComponent]
})
export class SplashModule {}
