import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { WhyMeComponent } from './sections/why-me/why-me.component';
import { SkillsComponent } from './sections/skills/skills.component';


import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    WhyMeComponent,
    TranslateModule,
    SkillsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private t: TranslateService) {
    this.t.addLangs(['de', 'en']);
    this.t.setDefaultLang('de');
  }

  setLang(lang: 'de' | 'en') {
    this.t.use(lang);
  }
}
