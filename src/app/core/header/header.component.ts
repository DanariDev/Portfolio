import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

type SectionId = 'hero' | 'why-me' | 'skills' | 'projects' | 'contact';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentLang: 'DE' | 'EN' = 'DE';

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  scrollTo(id: SectionId) {
    this.doc.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  setLang(lang: 'DE' | 'EN') {
    this.currentLang = lang; // später mit Translate koppeln
  }
}
