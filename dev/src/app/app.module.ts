import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
// import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { TabsModule } from './tabs/tabs.module';
import { MarkersModule } from './markers/markers.module';
import { InfoModule } from './info/info.module';
import { ViewArModule } from './view-ar/view-ar.module';
import { ViewVrModule } from './view-vr/view-vr.module';
import { ViewDebugModule } from './view-debug/view-debug.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    //  TabsModule,
    InfoModule,
    MarkersModule,
    ViewArModule,
    ViewVrModule,
    ViewDebugModule,

    // LoginModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [StatusBar, SplashScreen],
  bootstrap: [AppComponent]
})
export class AppModule {}
