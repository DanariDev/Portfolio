// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, HttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';              
import { routes } from './app.routes';                                               
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export function customTranslateLoader(): TranslateLoader {
  const http = inject(HttpClient);
  return {
    getTranslation(lang: string): Observable<Record<string, any>> {
      return http.get<Record<string, any>>(`/assets/i18n/${lang}.json`);
    },
  } as TranslateLoader;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled', 
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'de',
        loader: { provide: TranslateLoader, useFactory: customTranslateLoader },
      })
    ),
  ],
};
