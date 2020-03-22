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
    //	console.log('file uploader:', this.URL);
    this.uploader = new FileUploader({ url: this.URL, itemAlias: 'pptx', allowedFileType: ['pptx', 'ppt'] }); //pptx   , itemAlias: 'ppt'
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;

      console.log('file init:', file._file.name);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let resObj = JSON.parse(response);
      //console.log('file uploaded:', resObj.filename);
      this.uploaderComplete.emit(resObj.filename);
    };
  }

  selectedUserFile(event: any) {
    //console.log('selected:', event.target.files[0].name)
  }

  uploadFileChange(event: any) {}

  uploadFile(event: any) {
    //console.log('upload:', event)
    this.uploader.uploadAll();
  }
}
