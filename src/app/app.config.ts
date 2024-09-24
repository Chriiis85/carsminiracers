import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"carsminiracerses","appId":"1:831874569109:web:43336d4474402a77d71c9c","storageBucket":"carsminiracerses.appspot.com","apiKey":"AIzaSyALddg0jSMvRNdJNLA8I2e-_aFMsrfbAww","authDomain":"carsminiracerses.firebaseapp.com","messagingSenderId":"831874569109","measurementId":"G-S70DV838LM"})), provideAuth(() => getAuth())]
};
