import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { DataModule } from './data/data.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    DataModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'prueba-tecnica-acc',
        appId: '1:531976196190:web:221d4825d87cd98a67e4cf',
        storageBucket: 'prueba-tecnica-acc.firebasestorage.app',
        apiKey: 'AIzaSyDgRULHJq7sF8mkRkzSHMu-QHijgmOj0Jg',
        authDomain: 'prueba-tecnica-acc.firebaseapp.com',
        messagingSenderId: '531976196190',
        measurementId: 'G-Q7D8YWVKKG',
      })
    ),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
