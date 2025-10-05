import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

type Section = { id: string; heading: string; paragraphs: string[] };
type PrivacyDoc = { title: string; updated?: string; sections: Section[] };

@Component({
  standalone: true,
  selector: 'app-privacy',
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private i18n = inject(TranslateService);

  doc = signal<PrivacyDoc | null>(null);
  private sub?: Subscription;

  ngOnInit(): void {
    this.load(this.i18n.currentLang || this.i18n.getDefaultLang() || 'de');
    this.sub = this.i18n.onLangChange.subscribe(e => this.load(e.lang));
  }
  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  private load(lang: string) {
    const file = lang.startsWith('de') ? 'privacy.de.json' : 'privacy.en.json';
    this.http.get<PrivacyDoc>(`assets/privacy/${file}`).subscribe(this.doc.set);
  }
}
