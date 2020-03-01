import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppXModule } from './appx/appx.module';

import { AnalyticsModule } from './analytics/analytics.module';
import { SplashModule } from './splash/splash.module';
import { ImportModule } from './import/import.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),

    AppXModule,

    CoreModule,
    SharedModule,
    ShellModule,

    HomeModule,
    AnalyticsModule,
    SplashModule,
    ImportModule,

    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],

  declarations: [AppComponent],
  providers: [Keyboard, StatusBar, SplashScreen],
  bootstrap: [AppComponent]
})
export class AppModule {}
