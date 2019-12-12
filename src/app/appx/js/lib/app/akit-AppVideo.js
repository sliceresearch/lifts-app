import APPX_ObjectVideoGroupMaster from '../object/video/appx-ObjectVideoGroupMaster';
import APPX_AppPriority from './appx-AppPriority.js';

export default class APPX_AppVideo {
  constructor() {
    this.videoList = {};
    //   this.videoQueue = {};

    this.videoPairwiseQueue = new APPX_AppPriority((a, b) => a[1] > b[1]);

    this.videoLoadList = [];
    this.numberOfLoads = 1;

    this.focus = 0;
  }

  cycle() {
    this.updateLoadQueue();
  }

  registerVideo(name, imageWidth, imageHeight) {
    if (this.videoList[name] == undefined)
      this.videoList[name] = new APPX_ObjectVideoGroupMaster(
        name,
        '',
        imageWidth,
        imageHeight
      );
  }

  checkVideo(name) {
    if (this.videoList[name].check()) return true;

    return false;
  }

  getVideo(name) {
    return this.videoList[name].properties;
  }

  addLoadQueue(name) {
    //    console.log("addLoadQueue",name)
    var p = Date.now();
    this.videoList[name].priority = p;

    this.videoPairwiseQueue.push([name, -p]);
    //this.videoQueue[p] = name;

    //  console.log('queue',name,p);
  }

  updateLoadQueue() {
    if (this.videoLoadList.length < this.numberOfLoads) {
      if (this.videoPairwiseQueue.isActive())
        this.addLoadingList(this.videoPairwiseQueue.pop()[0]);
    }
  }

  setLoadNotify(name) {
    this.delLoadingList(name);
  }

  addLoadingList(name) {
    if (this.videoLoadList[name] == undefined) {
      //   console.log('loadlist', name);
      this.videoLoadList.push(name);
      this.videoList[name].setVideoLoad(name);
    }
  }

  delLoadingList(name) {
    let i = this.videoLoadList.indexOf(name);
    this.videoLoadList.remove(i);
  }

  setVideoFocus() {}

  // userEvent() {
  // console.log('video usere', this.focus.properties.video)
  //   if (this.focus!=0)
  //     this.focus.properties.video.play();
  //}
}
