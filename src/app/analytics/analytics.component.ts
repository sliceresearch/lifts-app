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

}
