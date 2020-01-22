import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppXComponent } from './appx.component';


import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,FormsModule],
  declarations: [AppXComponent,FileSelectDirective],
  exports: [AppXComponent]
})
export class AppXModule {}

