import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
//import { FileSelectDirective } from 'ng2-file-upload';

const URL = 'http://localhost:8080/api/upload'; //4000

@Component({
  selector: 'file-root',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Output() uploaderComplete: EventEmitter<number> = new EventEmitter();

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'pptx' }); //pptx   , itemAlias: 'ppt'

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let resObj = JSON.parse(response);
      console.log('file uploaded:', resObj.filename);
      this.uploaderComplete.emit(resObj.filename);
    };
  }
}
