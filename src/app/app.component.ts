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
    this.setupLanguages();
  }

  private setupLanguages(): void {
    this.t.addLangs(['de', 'en']);
    this.t.setFallbackLang('de'); 
    const saved = localStorage.getItem('lang');
    const browser = this.t.getBrowserLang();
    const lang = saved || (browser?.match(/de|en/) ? browser : 'de');
    this.t.use(lang);
  }
}
