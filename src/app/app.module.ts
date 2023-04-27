import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-PE';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
registerLocaleData(localeES);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
