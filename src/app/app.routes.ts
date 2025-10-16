import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'legal',
    loadComponent: () =>
      import('./pages/legal/legal.component').then((m) => m.LegalComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(
        (m) => m.PrivacyComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
