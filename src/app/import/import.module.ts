import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';


import { FileComponent } from '../core/file/file.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, ImportRoutingModule, FormsModule],
  entryComponents: [ImportComponent, FileComponent],
  declarations: [ImportComponent, FileSelectDirective, FileComponent]
})
export class ImportModule {}
