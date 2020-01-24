

import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';

const URL = 'http://localhost:8080/api/upload'; //4000

@Component({
  selector: 'file-root',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'pptx' }); //pptx   , itemAlias: 'ppt'
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       //  console.log('ImageUpload:uploaded:', item, status, response);
	  //   alert('File uploaded successfully');
	  let resObj = JSON.parse(response)
	  console.log('file uploaded:', resObj.filename); 
    };
 }
}
