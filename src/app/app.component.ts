import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private t = inject(TranslateService);

  constructor() {
    this.t.addLangs(['de', 'en']);
    this.t.setDefaultLang('de');

    const saved = localStorage.getItem('lang');
    const browser = this.t.getBrowserLang();
    const lang = (saved as 'de' | 'en') || (browser?.startsWith('de') ? 'de' : 'en');

    this.t.use(lang);
    document.documentElement.lang = lang;
  }
}
