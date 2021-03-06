import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { ActionSheetButton, ActionSheetOptions, TextFieldTypes } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from '@app/core';
import { AppXService } from '@app/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  presentations: any = [];
  presentation: any;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private platform: Platform,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private i18nService: I18nService,
    private appXService: AppXService
  ) {}

  ngOnInit() {
    this.subscribePresentationAnalytics();
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

      var active_presentation = this.presentations[pindex];
      //this.presentations.slice();
    }
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
