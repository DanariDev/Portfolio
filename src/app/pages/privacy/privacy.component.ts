import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateModule,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

type Section = { id: string; heading: string; paragraphs: string[] };
type Doc = { title: string; updated?: string; sections: Section[] };

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class PrivacyComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private t = inject(TranslateService);
  private sub?: Subscription;

  doc: Doc | null = null;

  ngOnInit(): void {
    const lang = this.normalize(this.currentLang());
    this.load(lang);
    this.watchLangChanges();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private currentLang(): string {
    return this.t.currentLang || this.t.getDefaultLang() || 'de';
  }

  private normalize(lang: string): 'de' | 'en' {
    const l = (lang || '').toLowerCase();
    return l.startsWith('de') ? 'de' : 'en';
  }

  private watchLangChanges(): void {
    this.sub = this.t.onLangChange.subscribe((e: LangChangeEvent) => {
      this.load(this.normalize(e.lang));
    });
  }

  private load(lang: 'de' | 'en'): void {
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
