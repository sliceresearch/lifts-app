import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
//import { FileSelectDirective } from 'ng2-file-upload';
import { AppXService } from '@app/core';

const apiUpload = '/upload'; //4000

@Component({
  selector: 'file-root',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Output() uploaderComplete: EventEmitter<number> = new EventEmitter();

  public uploader: FileUploader;
  public URL;

  constructor(private appXService: AppXService) {
    this.URL = this.appXService.baseUri + apiUpload;
    this.uploader = new FileUploader({ url: this.URL, itemAlias: 'pptx' }); //pptx   , itemAlias: 'ppt'
  }

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
