import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root3',
  templateUrl: './appx.component.html',
  styleUrls: ['./appx.component.css']
})
export class AppXComponent implements OnInit {
 // @ViewChild('canvas')
 // private canvasRef: ElementRef;

  constructor() {
    // window.APP.run.canvasSet(this.canvas);
  }

  ngOnInit() {
  //  window.APP.run.canvasSet(this.canvas);
  }

  //private get canvas(): HTMLCanvasElement {
  //  return this.canvasRef.nativeElement;
  //}
}
