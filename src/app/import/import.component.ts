import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';
//import { FileComponent } from '../core/file/file.component'

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  //@ViewChild(FileComponent, {static: false}) file: FileComponent;

  quote: string | undefined;
  isLoading = false;

  constructor(private appXService: AppXService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  navigateTo(link) {
    this.appXService.navigate(link);
  }

  isSelectedTab(type) {
    return this.appXService.islocation(type);
  }

  ///////

  importPresentation(fileName) {
    console.log('import:', fileName);

    let file = 'uploads';
    this.appXService.dataUserPresentationCurrentSet(fileName);
    this.appXService.dataUserPresentationAdd(fileName, file);
    this.appXService.dataUserProcess(true);
    this.appXService.navigate('/home');
  }
}
