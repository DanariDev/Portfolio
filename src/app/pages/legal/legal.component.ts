import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

type Section = { heading: string; paragraphs: string[] };
type LegalDoc = { title: string; date?: string; sections: Section[] };

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private i18n = inject(TranslateService);
  private sub?: Subscription;

  doc = signal<LegalDoc | null>(null);

  ngOnInit(): void {
    const lang = this.currentLang();
    this.loadDoc(lang);
    this.watchLangChanges();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private currentLang(): string {
    return this.i18n.currentLang || this.i18n.getDefaultLang() || 'de';
  }

  private watchLangChanges(): void {
    this.sub = this.i18n.onLangChange.subscribe(e => this.loadDoc(e.lang));
  }

  private loadDoc(lang: string): void {
    const file = lang.startsWith('de') ? 'legal.de.json' : 'legal.en.json';
    this.http.get<LegalDoc>(`assets/legal/${file}`).subscribe(this.doc.set);
  }
}
