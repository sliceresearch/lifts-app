import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { ActionSheetButton, ActionSheetOptions, TextFieldTypes } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from '@app/core';
//import { App3Service } from '@app/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})


export class ShellComponent {

	objectsData = [];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private platform: Platform,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private i18nService: I18nService
  ) {

 //   this.app3Service.call('objectGroup', []);
  //  this.app3Service.getData('objectGroup').subscribe(data => {
   //   this.objectsData = data['objectGroup'];
  //  });

  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  async changeLanguage() {
    const alertController = await this.alertController.create({
      header: this.translateService.instant('Change language'),
      inputs: this.i18nService.supportedLanguages.map(language => ({
        type: 'radio' as TextFieldTypes,
        name: language,
        label: language,
        value: language,
        checked: language === this.i18nService.language
      })),
      buttons: [
        {
          text: this.translateService.instant('Cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('Ok'),
          handler: language => {
            this.i18nService.language = language;
          }
        }
      ]
    });
    alertController.present();
  }
}

