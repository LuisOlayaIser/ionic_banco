import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { components, ComponentsModule } from './core/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './core/pipes/pipes.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: components,
  imports: [BrowserModule, IonicModule.forRoot({
    rippleEffect: false,
    mode: 'ios',
  }), AppRoutingModule, HttpClientModule, PipesModule, ComponentsModule],
  providers: [
    BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
