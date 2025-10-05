import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Datenschutz
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(
        (m) => m.PrivacyComponent
      ),
  },

  // Impressum
  {
    path: 'legal',
    loadComponent: () =>
      import('./pages/legal/legal.component').then(
        (m) => m.LegalComponent
      ),
  },

  { path: '**', redirectTo: '' },
];
