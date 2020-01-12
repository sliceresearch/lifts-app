import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  presentations: any = [];

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

  /////////////////////////////////////////////////////////////////////
  setGroupData(d: any) {
    // this.objectsData = d;
    //   console.log('call', this.objectsData);
  }

  setGroupIdx(i: any) {
    //this.app3Service.objectIndexSet(i);
  }

  setGroupTabIdx(i: any) {
    this.setGroupIdx(i);
    // this.slides.slideTo(i);
    // this.slideChanged();
  }

  getSelectedIdx(i: any) {
    /* if (i === this.app3Service.objectIndexGet()) {
      return true;
    }
    return false;*/
  }

  getSelectedIdxNameIcon(fn: any) {
    return null; // this.iconNames[fn];
  }
}
