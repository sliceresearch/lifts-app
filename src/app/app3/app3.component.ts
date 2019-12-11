import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root3',
  templateUrl: './app3.component.html',
  styleUrls: ['./app3.component.css']
})
export class App3Component implements OnInit {
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor() {
    // window.APP.run.canvasSet(this.canvas);
  }

  ngOnInit() {
    window.APP.run.canvasSet(this.canvas);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
}
