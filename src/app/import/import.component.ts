import { Component, OnInit, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private appXService: AppXService) 
  {}

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

  importPresentation() {
    let name = 'ICT221';
	let file = 'filedir';
	
	this.appXService.dataUserPresentationCurrentSet(name);
    this.appXService.dataUserPresentationAdd(name, file);
  }

}
