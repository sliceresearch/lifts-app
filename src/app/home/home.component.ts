import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
   
  }

///////


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
    return null;// this.iconNames[fn];
  }

}
