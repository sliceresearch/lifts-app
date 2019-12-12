import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';

import { environment } from '@env/environment';
import { IonSlides } from '@ionic/angular';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-arview',
  templateUrl: './view-ar.component.html',
  styleUrls: ['./view-ar.component.scss']
})
export class ViewArComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(IonSlides)
  slides: IonSlides;

  @ViewChild('canvas')
  canvasRef: ElementRef;

  @ViewChild('footer') footerElement: any;
  footerHeight: any;

  // @ViewChild('content') contentElement: any;
  contentSlideHeight = -20; /// > go up
  contentHeight: any;

  screenInfo: boolean = false;

  objectsData = [];
  tabsData = [];

  started: any;
  version: string = environment.version;

  slideOpts = {
    // direction: 'vertical'
    // longSwipesMs:50,
    // resistance:false,
    //  height:500,
    speed: 500,
    resistanceRatio: 0.2
  };

  iconNames = { video: 'film', obj: 'cube' };

  constructor(private app3Service: AppXService) {
    // this.app3Service.parentSet(this);
    this.app3Service.call('objectGroup', []);
    this.app3Service.getData('objectGroup').subscribe(data => {
      this.objectsData = data['objectGroup'];
      this.tabsData = data['objectGroup'];
      //   console.log(this.objectsData);
      //  this.showHelp();
    });

    this.app3Service.markerVisible.subscribe(data => {
      if (data) {
        this.hideHelp();
      } else {
        this.showHelp();
      }
    });

    this.app3Service.triggerUpdate.subscribe(data => {
      this.slideToThis(data);
    });
  }

  ngOnInit() {
    //  this.slides.threshold = 50;
    // window.APP.run.canvasSet(this.canvas);
  }

  ngAfterViewInit() {
    // this.app3Service.init(0);

    //  console.log('ar view init 0');

    window.APPX.devices.initMediaDevices(this);

    //  console.log('ar view init 1');
  }

  callbackDevices() {
    //  console.log('ar view callback');

    window.APP.run.canvasSet(this.canvas);

    this.setGroupData([]);
    this.init();
    this.start();

    this.setContentHeight();
    this.showHelp();
  }

  setContentHeight() {
    setTimeout(() => {
      const hh = this.footerElement.nativeElement.offsetHeight;
      this.footerHeight = hh;
      this.contentHeight = this.contentSlideHeight + this.footerHeight;
    }, 1000);
  }

  getContentStyle(): Object {
    return { position: 'absolute', width: '100%', bottom: this.contentHeight + 'px' };
  }

  ngOnDestroy() {
    this.app3Service.stop();
    this.app3Service.stopAR();
  }

  public init() {
    if (!this.app3Service.startedARCheck()) {
      this.app3Service.startAR(window.APP.platformAR); //'arjs');
      this.app3Service.cycleStart();
    }
    this.app3Service.loadAR();
  }

  public start() {
    this.app3Service.setSceneWindow();
    this.app3Service.setCanvas();
    this.app3Service.setElement();
    this.app3Service.start();
  }

  public destroy() {}
  ////////////////////////////////////// img

  showHelp() {
    this.screenInfo = true;
    // window.APP.run.parent.call('objectGroup', []);
    this.objectsData = [];
  }

  hideHelp() {
    this.screenInfo = false;
    window.APP.run.app.objectGroupDataSet();
  }
  ////////////////////////////////////// slides

  slideToThis(i: any) {
    this.slides.slideTo(i);
  }

  slideChanged() {
    this.slides.getActiveIndex().then(i => {
      //  console.log('slideChanged',i);
      this.app3Service.objectIndexSet(i);
    });
  }

  slideNextStart() {
    //  console.log("start")
    this.app3Service.objectIndexFade();
  }

  slideNextEnd() {
    //  console.log("end")
  }

  slidePrevStart() {
    // console.log("start")
  }

  slidePrevEnd() {
    //  console.log("end")
  }

  setGroupData(d: any) {
    this.objectsData = d;
    //   console.log('call', this.objectsData);
  }

  setGroupIdx(i: any) {
    this.app3Service.objectIndexSet(i);
  }

  setGroupTabIdx(i: any) {
    this.setGroupIdx(i);
    this.slides.slideTo(i);
    // this.slideChanged();
  }

  getSelectedIdx(i: any) {
    if (i === this.app3Service.objectIndexGet()) {
      return true;
    }
    return false;
  }

  getSelectedIdxNameIcon(fn: any) {
    return this.iconNames[fn];
  }
  // getSelectedIconName(i: any) {
  //  const fileName = this.app3Service.objectIndexGetFileType(i);
  //   return this.iconNames[fileName];
  //}

  slideUpdate() {
    this.slides.update();
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
}

/*

public call(msg: any, data: any) {
   this.setGroupData(data);
 }

 objects(grp: any, code: any) {
   if (this.app3Service.loadObjects(grp)) {
     const dir = '/assets/model/' + 'group' + code + '/';
     this.app3Service.setObjects('data', dir);
   }
 }

 */
