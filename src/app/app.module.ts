import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { BatteryStatus } from '@awesome-cordova-plugins/battery-status/ngx';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Device,
    Network,
    BatteryStatus,
    Toast,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
