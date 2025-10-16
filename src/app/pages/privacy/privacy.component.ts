import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';

type Section = { id: string; heading: string; paragraphs: string[] };
type Doc = { title: string; updated?: string; sections: Section[] };

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class PrivacyComponent {
  doc: Doc | null = null;

  constructor(private http: HttpClient, private t: TranslateService) {
    const init = this.normalize(
      this.t.currentLang || this.t.getDefaultLang() || 'de'
    );
    this.load(init);

    this.t.onLangChange.subscribe((e: LangChangeEvent) => {
      this.load(this.normalize(e.lang));
    });
  }

  private normalize(lang: string): 'de' | 'en' {
    const l = (lang || '').toLowerCase();
    return l.startsWith('de') ? 'de' : 'en';
  }

  private load(lang: 'de' | 'en') {
    const url = `assets/privacy/privacy.${lang}.json?v=${Date.now()}`;
    this.http.get<Doc>(url).subscribe({
      next: (d) => (this.doc = d),
      error: () => {
        this.doc = {
          title: lang === 'de' ? 'Datenschutz' : 'Privacy Policy',
          sections: [],
        };
      },
    });
  }
}
