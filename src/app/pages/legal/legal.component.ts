import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

type Section = { heading: string; paragraphs: string[] };
type LegalDoc = { title: string; date?: string; sections: Section[] };

@Component({
  standalone: true,
  selector: 'app-legal',
  imports: [CommonModule],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private i18n = inject(TranslateService);

  doc = signal<LegalDoc | null>(null);
  private sub?: Subscription;

  ngOnInit(): void {
    const lang = this.i18n.currentLang || this.i18n.getDefaultLang() || 'de';
    this.load(lang);
    this.sub = this.i18n.onLangChange.subscribe(e => this.load(e.lang));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private load(lang: string) {
    const file = lang.startsWith('de') ? 'legal.de.json' : 'legal.en.json';
    this.http.get<LegalDoc>(`assets/legal/${file}`).subscribe(this.doc.set);
  }
}
