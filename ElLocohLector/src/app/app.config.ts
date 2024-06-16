import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSRNs8GgTzzqrwUr5zayE4XjkyVpaHBzk",
  authDomain: "lokolector-8f586.firebaseapp.com",
  projectId: "lokolector-8f586",
  storageBucket: "lokolector-8f586.appspot.com",
  messagingSenderId: "734050561250",
  appId: "1:734050561250:web:2026f36a1d9278c65b02bb"
};


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withHashLocation()), provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
  )],
};
