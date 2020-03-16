import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { IonSlides } from '@ionic/angular';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild(IonSlides, { static: false })
  slides: IonSlides;

  quote: string | undefined;
  isLoading = false;

  presentation: any;
  presentation_data = { name: '', title: '', author: '', modified: '' };
  presentations: any;
  presentation_slides: any = [];

  slide_analytics: any = [];
  slide_title: any = [];
  slide_content: any = [];
  slide_index: any = 0;

  slideOpts = {
    // direction: 'vertical'
    // longSwipesMs:50,
    // resistance:false,
    //  height:500,
    speed: 500,
    resistanceRatio: 0.2
  };

  constructor(private appXService: AppXService) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscribePresentationAnalytics();
  }

  ngAfterViewInit() {
    this.navigateSlide();
  }

  navigateTo(link) {
    this.appXService.navigate(link);
  }

  isSelectedTab(type) {
    return this.appXService.islocation(type);
  }

  subscribePresentationAnalytics() {
    this.appXService.userDataGet('presentation').subscribe(data => {
      this.presentation = data;
      this.updateAnalytics();
    });

    this.appXService.userDataGet('presentations').subscribe(data => {
      this.presentations = data;
      this.updateAnalytics();
    });
  }

  updateAnalytics() {
    if (this.presentation && this.presentations) {
      let pindex = this.appXService.dataPresentationIndexGet(this.presentation);
      let presentation = this.presentations[pindex];

      if (presentation) {
        this.presentation_slides = presentation.slides;
        //	this.presentation_analytics = presentation.slides;
        this.presentation_data = {
          name: presentation.name,
          author: presentation.author,
          title: presentation.title,
          modified: presentation.modified
        };

        this.updateSlide();
      }
    }
  }

  updateSlide() {
    var slide = this.presentation_slides[this.slide_index];

    this.slide_title = slide.title;
    this.slide_content = slide.content;
    this.slide_analytics = slide.analytics;

    console.log('update:', this.slide_title, this.slide_content, this.slide_analytics);
  }

  navigateSlide() {
    let i = this.appXService.data_index;
    this.slideToThis(i);
  }

  analysePresentation() {
    this.appXService.navigate('/splash');
    this.appXService.dataUserProcess(true);
  }

  ////////////////////////////////////////////

  ////////////////////////////////////// slides

  getSelectedIdx(i: any) {
    //	if (i === this.app3Service.objectIndexGet()) {
    //	  return true;
    //	}
    //	return false;
  }

  getSelectedIdxNameIcon(fn: any) {
    //return this.iconNames[fn];
  }

  slideOutline(i: any) {
    if (this.slide_index == i) return 'true';
    return 'false';
  }

  slideToThis(i: any) {
    console.log('slideToThis' + i);
    this.slides.slideTo(i);
  }

  slideChanged() {
    this.slides.getActiveIndex().then(i => {
      console.log('slide index' + i);
      this.slide_index = i;
      this.updateSlide();
    });
  }

  slideNextStart() {
    console.log('start');
    //this.app3Service.objectIndexFade();
  }

  slideNextEnd() {
    console.log('end');
  }

  slidePrevStart() {
    // console.log("start")
  }

  slidePrevEnd() {
    //  console.log("end")
  }
}
