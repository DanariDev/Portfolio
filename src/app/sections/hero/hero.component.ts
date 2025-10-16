import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  goTo(id: string) {
    const el = this.doc.getElementById(id);
    if (el) {
      const headerOffset = 100; 
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      this.doc.location.hash = id; 
    }
  }
}
